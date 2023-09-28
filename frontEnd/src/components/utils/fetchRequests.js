export const handleLoginPostRequest = async (url,email, password) => {
  try {
  
  // Define the request data (email and password)
  // Define the form data as an object
  const formData = new URLSearchParams();
  formData.append('email', email);
  formData.append('password', password);

    // Create the fetch request
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded', // Specify the content type as JSON
      },
      body: formData, // Convert the request data to JSON
    });

   
    const data = await response.json(); // Parse the JSON response

    // Handle the successful response here
    if (data) {
      return {error: false, message: data.message}
    }
  } catch (error) {
    // Handle errors here
     return {error: true, message: error.message}
  }
};

//GET: fetch current serial ->
export const getContent = async (url) => {
 try {
   const res = await fetch(url, {
    method: 'GET',
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

   const data = await res.json();
   
 if (data) {
      return {error: false, message: data.message, data: data.payload}
    }
  } catch (error) {
    // Handle errors here
     return {error: true, message: error.message, data: data.payload}
  }
}


