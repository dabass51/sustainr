'use client'

import React, { useEffect, useState } from 'react';
import { co2 } from '@tgwf/co2'
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

Chart.register(...registerables);

import Link from 'next/link';

export default function DashboardPage() {
  
  const [sustainr, setSustainr] = useState([]);
  const [dailyEmissions, setDailyEmissions] = useState({});
  const [dailyEmissionsInPeriod, setDailyEmissionsInPeriod] = useState({});

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2024, 0, 1),
    to: addDays(new Date(2024, 0, 7), 20),
  })

  const co2Emission = new co2();

  useEffect(() => {
    const fetchSustainr = async () => {
      try {
        const response = await fetch('/api/sustainr');
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json().then();

        setSustainr(data)
         
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
      }
    };
    fetchSustainr();
    
  }, []);

  useEffect(() => {
    const calculateDailyEmissions = (data) => {
      const dailyData = {};
      console.log( data )
      data.forEach(item => {
          const date = new Date(item.createdAt).toLocaleDateString();
          console.log( item )
          const resources = JSON.parse(item.resources);
          resources.forEach(resource => {
              const emission = co2Emission.perByte(resource.transferSize, true);
              dailyData[date] = (dailyData[date] || 0) + emission;
          });
      });

      setDailyEmissions(dailyData);
    };

    if (sustainr.length > 0) {
        calculateDailyEmissions(sustainr);
    }
  }, [sustainr]);

  useEffect(() => {
    const filteredData = filterDataByDateRange(dailyEmissions, date);
    setDailyEmissionsInPeriod(filteredData);
  }, [dailyEmissions, date]);

  const filterDataByDateRange = (data, dateRange) => {
    const filteredData = {};
    if (!dateRange.from || !dateRange.to) {
      return filteredData;
    }
  
    for (const [key, value] of Object.entries(data)) {
      const itemDate = new Date(key);
      if (itemDate >= dateRange.from && itemDate <= dateRange.to) {
        filteredData[key] = value;
      }
    }
    console.log( filteredData )
    return filteredData;
  };

  const chartData = {
    labels: Object.keys(dailyEmissionsInPeriod),
    datasets: [{
        label: 'Daily CO2 Emissions (grams)',
        data: Object.values(dailyEmissionsInPeriod),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
    }]
  };

  return (
    <>
      
      <div className="h-full flex-1 flex-col space-y-8 p-8 flex">

      <div className="grid gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className="w-[300px] justify-start text-left font-normal text-muted-foreground"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>

        <div className="flex items-center justify-between space-y-2">
          <h3 className="text-xl font-bold">Daily CO2 Emissions</h3>
          <Line data={chartData} />
        </div>

        <div className="flex items-center justify-between space-y-2">

            <div>
                <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
                <p className="text-muted-foreground">
                    Here is the CO2 Footprint of your page!
                </p>            
                {sustainr.map((item, index) => (
                    <div key={index} className="border">
                        <p>{item.client_id}</p>
                        {item.resources && JSON.parse(item.resources).map((resource, indexInner) => (
                            <div key={indexInner}>
                                <p>{resource.name}</p>
                                <p>{co2Emission.perByte(resource.transferSize, true)} grams of CO2</p>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    </div>

    </>
  )
}