/// Global scope variables.
let fetcedData = [];

/// REST API.
const apiUrl = "YOUR_BACKEND_API_URL";

const exampleURL = "https://turkeyMap/admin";
const isAdmin = exampleURL.split("/")[3] ? true : false;

// Function to fetch data from the backend for users
async function fetchData() {
  try {
    const response = await fetch(`${apiUrl}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    // Assuming your backend returns data in JSON format
    const data = await response.json();

    // Display the data for users
    console.log("Data for users:", data);
  } catch (error) {
    console.error("Error fetching data for users:", error.message);
  }

  return data;
}

// Function to send data to the backend for admins
async function sendDataToBackend(data) {
  try {
    const response = await fetch(`${apiUrl}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    // Assuming your backend returns a response (e.g., success or updated data)
    const responseData = await response.json();

    // Display the response data for admins
    console.log("Response from server for admin:", responseData);
  } catch (error) {
    console.error("Error sending data for admin:", error.message);
  }
}

// Example data to send to the backend for admin (modify this according to your needs)
const dataToSendByAdmin = {
  data_1: "newdata_1",
  data_2: "newdata_2",
};

// Call the appropriate function based on the user role
// if (isAdmin || !isAdmin) {
//   fetcedData = fetchData();
// } else if (isAdmin) {
//   sendDataToBackend(dataToSendByAdmin);
// }

/// Bind the map container events and some CSS features.
function bindActionEvents() {
  $(".button-class")
    .off()
    .on("click", clickCity);

  $(".path-class")
    .off()
    .on("mouseover", onMouseoverCity)
    .on("mouseout", onMouseoutCity)
    .on("mousemove", (e) => {
      onMoveMovableContainer(e);
    })
    .on("touchmove", (e) => {
      onMoveMovableContainer(e);
    });

  function clickCity(e) {
    console.log(e.currentTarget.id);
  }

  function onMouseoverCity(e) {
    $(e.currentTarget).css({
      fill: "#dcdcdcdc",
    });
  }

  function onMouseoutCity(e) {
    $(".movable-container").hide();
    $(e.currentTarget).css({
      fill: "rgb(56, 62, 66)",
    });
  }
}

bindActionEvents();

//Detect touch device
function isTouchDevice() {
  try {
    //We try to create TouchEvent. It would fail for desktops and throw error
    document.createEvent("TouchEvent");
    return true;
  } catch (e) {
    return false;
  }
}

const onMoveMovableContainer = (e) => {
  $(".movable-container").show();
  //Try, catch to avoid any errors for touch screens (Error thrown when user doesn't move his finger)
  try {
    //PageX and PageY return the position of client's cursor from top left of screen
    var x = !isTouchDevice() ? e.pageX : e.touches[0].pageX;
    var y = !isTouchDevice() ? e.pageY : e.touches[0].pageY;
  } catch (e) {}
  //set left and top of div based on mouse position
  $(".movable-container").css("left", x - 25 + "px");
  $(".movable-container").css(
    "top",
    y - parseInt($(".movable-container").css("height")) - 25 + "px"
  );
};
