//import axios from "axios";
import * as Carousel from "./Carousel.js";



// The breed selection input element.
const breedSelect = document.getElementById("breedSelect");
// The information section div element.
const infoDump = document.getElementById("infoDump");
// The progress bar div element.
const progressBar = document.getElementById("progressBar");
// The get favourites button element.
const getFavouritesBtn = document.getElementById("getFavouritesBtn");

// Step 0: Store your API key here for reference and easy access.
const API_KEY = "live_owKTGYHtMAIXIAhEjAZKw8Z7ueExz8oB2hOEMcNrSJuP30FJiBGyiliLIfpXSoUH";

/**
 * 1. Create an async function "initialLoad" that does the following:
 * - Retrieve a list of breeds from the cat API using fetch().
 * - Create new <options> for each of these breeds, and append them to breedSelect.
 *  - Each option should have a value attribute equal to the id of the breed.
 *  - Each option should display text equal to the name of the breed.
 * This function should execute immediately.
 */

 //#region  USING FETCH
// async function initialLoad() {
//     const res = await fetch("https://api.thecatapi.com/v1/breeds", {

//         headers: {
//             "x-api-key": API_KEY
//         }
//     });
//     const data = await res.json();
//     // create the default option for the select element
//     const defaultOption = document.createElement("option");
//         defaultOption.value = "";
//         defaultOption.textContent = "Select a breed...";
//         // mark it as selected and disable it after selecting a breed
//         defaultOption.selected = true;
//         defaultOption.disabled = true;
//         // append the defaultOption to the select element
//         breedSelect.appendChild(defaultOption);
    
//         // create the breed options dynamically
//         data.forEach((breed) => {
//             const option = document.createElement("option");
//             option.value = breed.id;
//             option.textContent = breed.name;
//             breedSelect.appendChild(option);
//         });
//     }
//     initialLoad();
    


/**
 * 2. Create an event handler for breedSelect that does the following:
 * - Retrieve information on the selected breed from the cat API using fetch().
 *  - Make sure your request is receiving multiple array items!
 *  - Check the API documentation if you're only getting a single object.
 * - For each object in the response array, create a new element for the carousel.
 *  - Append each of these new elements to the carousel.
 * - Use the other data you have been given to create an informational section within the infoDump element.
 *  - Be creative with how you create DOM elements and HTML.
 *  - Feel free to edit index.html and styles.css to suit your needs, but be careful!
 *  - Remember that functionality comes first, but user experience and design are important.
 * - Each new selection should clear, re-populate, and restart the Carousel.
 * - Add a call to this function to the end of your initialLoad function above to create the initial carousel.
 */



// breedSelect.addEventListener("change", async () => {
//     // clear the carousel
//     Carousel.clear();
//     // get the selected breed
//     const selectedBreed = breedSelect.value;
//     // get the breed information
//     const res = await fetch(`https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=${selectedBreed}`, {
//         headers: {
//             "x-api-key": API_KEY
//         }
//     });
//     const dataImages = await res.json();

//     // get the breed information
//     const breedInfo = await fetch (`https://api.thecatapi.com/v1/breeds/${selectedBreed}`, {
//         headers: {
//             "x-api-key": API_KEY
//         }
//     });
//     const breedData = await breedInfo.json();
//     // create the carousel items
//     dataImages.forEach((image) => {
//         const carouselItem = Carousel.createCarouselItem(image.url, breedData.name, image.id);

      

//         Carousel.appendCarousel(carouselItem);
       
//     });

//     // create the breed information
//     infoDump.innerHTML = `
//         <h2>${breedData.name}</h2>
//         <p>${breedData.description}</p>
//         <p>Origin: ${breedData.origin}</p>
//         <p>Life Span: ${breedData.life_span}</p>
//         <p>Temperament: ${breedData.temperament}</p>
//     `;
 
//     // restart the carousel
//     Carousel.start();
    
//  });

// #endregion



// #region USING AXIOS

/**
 * 3. Fork your own sandbox, creating a new one named "JavaScript Axios Lab."
 */



/**
 * 4. Change all of your fetch() functions to axios!
 * - axios has already been imported for you within index.js.
 * - If you've done everything correctly up to this point, this should be simple.
 * - If it is not simple, take a moment to re-evaluate your original code.
 * - Hint: Axios has the ability to set default headers. Use this to your advantage
 *   by setting a default header with your API key so that you do not have to
 *   send it manually with all of your requests! You can also set a default base URL!
 */

// ======== USING AXIOS =========
// setting the default base URL
  axios.defaults.baseURL= "https://api.thecatapi.com/v1/";
// setting the default headers
  axios.defaults.headers.common['x-api-key'] = API_KEY;


async function initialLoad() {
    const res = await axios.get(`breeds`);
    // create the default option for the select element
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Select a breed...";
    // mark it as selected and disable it after selecting a breed
    defaultOption.selected = true;
    defaultOption.disabled = true;
    // append the defaultOption to the select element
    breedSelect.appendChild(defaultOption);

    // create the breed options dynamically
    res.data.forEach((breed) => {
        const option = document.createElement("option");
        option.value = breed.id;
        option.textContent = breed.name;
        breedSelect.appendChild(option);
    });
}
initialLoad();




breedSelect.addEventListener("change", async () => {
    // clear the carousel
    Carousel.clear();
    // get the selected breed
    const selectedBreed = breedSelect.value;
    // get the breed information
    const res = await axios.get(`images/search?limit=10&breed_ids=${selectedBreed}`);
    // get the breed information
    const breedInfo = await axios.get(`breeds/${selectedBreed}`);
    // create the carousel items
    res.data.forEach((image) => {
        const carouselItem = Carousel.createCarouselItem(image.url, breedInfo.data.name, image.id);

      

        Carousel.appendCarousel(carouselItem);
       
    });

    // create the breed information
    infoDump.innerHTML = `
        <h2>${breedInfo.data.name}</h2>
        <p>${breedInfo.data.description}</p>
        <ul>
        <li><strong>Origin: </strong> ${breedInfo.data.origin}</li>
        <li><strong>Life Span:</strong> ${breedInfo.data.life_span}</li>
        <li><strong>Temperament:</strong> ${breedInfo.data.temperament}</li>
        </ul>
    `;
 
    // restart the carousel
    Carousel.start();
    
});


//#endregion



/**
 * 5. Add axios interceptors to log the time between request and response to the console.
 * - Hint: you already have access to code that does this!
 * - Add a console.log statement to indicate when requests begin.
 * - As an added challenge, try to do this on your own without referencing the lesson material.
 */

// #region USING FETCH

// Add a request interceptor to capture the start time
axios.interceptors.request.use(
    (config) => {
      // Log when the request starts
      config.metadata = { startTime: new Date() };  // Save the start time in the request metadata
      console.log(`Request started at: ${config.metadata.startTime}`);
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  // Add a response interceptor to calculate the time taken for the request
  axios.interceptors.response.use(
    (response) => {
      // Calculate the time taken for the request
      const endTime = new Date();
      const timeTaken = endTime - response.config.metadata.startTime; // time in milliseconds
      console.log(`Request completed in ${timeTaken} ms`);
      return response;
    },
    (error) => {
      // Handle errors, like when a request fails
      if (error.config && error.config.metadata) {
        const endTime = new Date();
        const timeTaken = endTime - error.config.metadata.startTime;
        console.log(`Request failed after ${timeTaken} ms`);
      }
      return Promise.reject(error);
    }
  );
  
//#endregion

/**
 * 6. Next, we'll create a progress bar to indicate the request is in progress.
 * - The progressBar element has already been created for you.
 *  - You need only to modify its "width" style property to align with the request progress.
 * - In your request interceptor, set the width of the progressBar element to 0%.
 *  - This is to reset the progress with each request.
 * - Research the axios onDownloadProgress config option.
 * - Create a function "updateProgress" that receives a ProgressEvent object.
 *  - Pass this function to the axios onDownloadProgress config option in your event handler.
 * - console.log your ProgressEvent object within updateProgess, and familiarize yourself with its structure.
 *  - Update the progress of the request using the properties you are given.
 * - Note that we are not downloading a lot of data, so onDownloadProgress will likely only fire
 *   once or twice per request to this API. This is still a concept worth familiarizing yourself
 *   with for future projects.
 */


/**
 * 7. As a final element of progress indication, add the following to your axios interceptors:
 * - In your request interceptor, set the body element's cursor style to "progress."
 * - In your response interceptor, remove the progress cursor style from the body element.
 */
/**
 * 8. To practice posting data, we'll create a system to "favourite" certain images.
 * - The skeleton of this function has already been created for you.
 * - This function is used within Carousel.js to add the event listener as items are created.
 *  - This is why we use the export keyword for this function.
 * - Post to the cat API's favourites endpoint with the given ID.
 * - The API documentation gives examples of this functionality using fetch(); use Axios!
 * - Add additional logic to this function such that if the image is already favourited,
 *   you delete that favourite using the API, giving this function "toggle" functionality.
 * - You can call this function by clicking on the heart at the top right of any image.
 */
export async function favourite(imgId) {
    // your code here
}

/**
 * 9. Test your favourite() function by creating a getFavourites() function.
 * - Use Axios to get all of your favourites from the cat API.
 * - Clear the carousel and display your favourites when the button is clicked.
 *  - You will have to bind this event listener to getFavouritesBtn yourself.
 *  - Hint: you already have all of the logic built for building a carousel.
 *    If that isn't in its own function, maybe it should be so you don't have to
 *    repeat yourself in this section.
 */

/**
 * 10. Test your site, thoroughly!
 * - What happens when you try to load the Malayan breed?
 *  - If this is working, good job! If not, look for the reason why and fix it!
 * - Test other breeds as well. Not every breed has the same data available, so
 *   your code should account for this.
 */
