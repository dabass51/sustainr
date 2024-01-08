"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSearchParams } from 'next/navigation'

import Loading from "@/components/Loading";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams()

  useEffect(() => {
    if (status === "unauthenticated") {
      return router.push("/auth/signin");
    }
  }, [status, session, router]);

  if ( status === "loading") {
    return <Loading></Loading>;
  }

  return (
    <>{children}</>
  );
}