const handlePostRequest = async (email, password) => {
  try {
    // Define the endpoint URL
    const apiUrl = "/api/users/login"; // Replace with your actual API URL

    // Define the request data (email and password)
  // Define the form data as an object
  const formData = new URLSearchParams();
  formData.append('email', email);
  formData.append('password', password);

    // Create the fetch request
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded', // Specify the content type as JSON
      },
      body: formData.toString(), // Convert the request data to JSON
    });

    if (!response.ok) {
      alert('Network response was not ok');
      // return;
    }

    const data = await response.json(); // Parse the JSON response

    // Handle the successful response here
    console.log(data);
    console.log(response);
  } catch (error) {
    // Handle errors here
    console.error('Fetch error:', error);
  }
};

export default handlePostRequest;
