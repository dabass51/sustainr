import Image from 'next/image'
import Script from 'next/script'


export default function Home() {
  return (
    <>

      <Script src="http://localhost:3000/track/sustainr.js"></Script>

      <Script id="google-analytics">
        {`
          window.sustainrDL = window.sustainrDL || [];
          function sustainr(){window.sustainrDL.push(arguments);}
          sustainr('trackEvent', 'pageView', { clientId: '123e4567-e89b-12d3-a456-426655440000' });
        `}
      </Script>

    </>
  )
}
