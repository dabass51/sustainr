(function processSustainrDL() {
    if (window.sustainrDL && window.sustainrDL.length > 0) {
        window.sustainrDL.forEach(function(data) {
            var clientId = data[data.length - 1].clientId; // Extract the client ID

            // Process and send the data along with the client ID
            sendDataToAPI(data, clientId);
        });
        window.sustainrDL = [];
    }

    function sendDataToAPI(data, clientId) {
        // Prepare the payload
        const payload = {
            clientId: clientId,
            data: data,
            resources: performance.getEntriesByType("resource").map(r => ({
                name: r.name,
                transferSize: r.transferSize,
                startTime: r.startTime,
                duration: r.duration
            }))
        };

        // Send the data to your Next.js API
        fetch('/api/sustainr', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        }).then(response => response.json())
          .then(data => console.log('Success:', data))
          .catch((error) => console.error('Error:', error));
    }
})();
