// 1. Select DOM elements
const adviceDisplay = document.getElementById("advice-display")
const fetchBtn = document.getElementById("fetch-btn")

// 2. Async function to fetch random advice from public API
const fetchAdvice = async () =>{
    try{
        // Show loading state
        adviceDisplay.textContent = "Loading wisdom..."
        fetchBtn.disabled = true

        // Fetch data from Advice Slip API
        const response = await fetch("https://api.adviceslip.com/advice")

        // Check if HTTP response is successful (status 200-299)
        if (!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`)
        }

        // Parse response body as JSON
        const data = await response.json()

        // Update UI with fetched advice text
        adviceDisplay.textContent = `"${data.slip.advice}"`       

    }
    catch (error) {
        // Handle network failures or bad URLs gracefully
        console.error = ("Error fetching advice:", error)
        adviceDisplay.textContent = "Oops! Could not fetch advice. Check your network connection."
        
    }
    finally{
        // Re-enable button after request completes
        fetchBtn.disabled = false
    }
}

// 3. Event Listener for Button Click
fetchBtn.addEventListener("click", fetchAdvice)

// Automatically fetch first advice on page load
fetchAdvice()