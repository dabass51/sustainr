'use client'

import { useState, useEffect, Suspense } from 'react';
import { getCsrfToken } from 'next-auth/react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Loading from "@/components/Loading";

export default function SignIn() {
  const [csrfToken, setCsrfToken] = useState<String|undefined>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCsrfToken() {
      const token = await getCsrfToken();
      setCsrfToken(token);
      setLoading(false);
    }

    fetchCsrfToken();
  }, []);

  return (
    <div className="flex flex-col min-h-screen p-10">
      <Card>
        <CardHeader>
        <CardTitle>Create an account
        </CardTitle>
        <CardDescription>Enter your email below to create your account with a magic email</CardDescription>
        </CardHeader>
        <CardContent>
            {csrfToken
                ?   <form action="/api/auth/signin/email" method="post">
                        <input name="csrfToken" type="hidden" defaultValue={csrfToken as string} />
                        <Label htmlFor="email">Email</Label>
                        <Input className="mb-2" id="email" placeholder="please enter your email adress" name="email" />
                        <Button className="mr-2" variant="outline">Cancel</Button>
                        <Button type="submit">Submit</Button>
                    </form>
                    
                : <Loading />
            }
        </CardContent>
        <CardFooter>
            <p className="px-8 text-center text-sm text-muted-foreground">By clicking continue, you agree to our <a className="underline underline-offset-4 hover:text-primary" href="/tos">Terms of Service</a> and <a className="underline underline-offset-4 hover:text-primary" href="/privacy">Privacy Policy</a>.</p>
            
            
        </CardFooter>
          
      </Card>
    </div>
  );
}
