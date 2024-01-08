import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

export default function VerifyRequest() {
  
  return (
    <div className="flex flex-col min-h-screen p-10">
      <Card>
        <CardHeader>
          <CardTitle>Check your email</CardTitle>
          <CardDescription>you can signin via magic link</CardDescription>
        </CardHeader>
        <CardContent>
          A sign in link has been sent to your email address.
        </CardContent>
        <CardFooter className="flex justify-between">
            
        </CardFooter>
      </Card>
    </div>
  );
}
