document.addEventListener('DOMContentLoaded', () => {
  // Check if the login form is correctly selected
  const loginForm = document.querySelector('.login-form');
  console.log(loginForm); 

  // Check if email and password inputs are correctly selected
  const emailInput = document.querySelector('#email-login');
  const passwordInput = document.querySelector('#password-login');
  console.log(emailInput, passwordInput);
  
  // Submit event listener for the login form
  loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Get the email and password values from user input
      const email = emailInput.value;
      const password = passwordInput.value;

      // Validate the username and password values
      // if (!email || !password) {
      //   alert('Email and password are required');
      //   return;
      // }

      // Send a POST request to the back end API with email and password 
      if (email && password) {
          try {
              const res = await fetch('/api/users/login', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                      email,
                      password
                  })
              });
              
              // Throw error if problem with HTTP req
              if (!res.ok) {
                  throw new Error(res.statusText);
              }
          
              const data = await res.json();
              console.log('Success! Logged in', data);
              // If response is successful, redirect user to profile page
              window.location.href = '/profile';
              // Catch any errors during fetch
          } catch (error) {
              console.error('Error: Unable to login:', error);
          }
      }
  });
});
