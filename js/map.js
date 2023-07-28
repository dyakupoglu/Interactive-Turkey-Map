/// Global scope variables.
let currentCity = "";
let dropdownSelection = $("#adminPanelDropdown:first").val();
let fetchedData = {}; /// Real data that will come from backend.
const dummyData = {
  cities: {
    ankara: {
      color: "ff7800",
      parties: {
        akp: {
          partyAcronym: "AKP",
          partyName: "ak parti",
          partyPercantage: 10.1,
          totalVote: 12000,
          color: "ff7800",
        },
        chp: {
          partyAcronym: "CHP",
          partyName: "chp",
          partyPercantage: 10.1,
          totalVote: 25000,
          color: "a90000",
        },
        iyi: {
          partyAcronym: "İYİ",
          partyName: "iyi parti",
          partyPercantage: 10.1,
          totalVote: 10000,
          color: "0f94ca",
        },
      },
    },
    istanbul: {
      color: "ff7800",
      parties: {
        akp: {
          partyAcronym: "AKP",
          partyName: "ak parti",
          partyPercantage: 10.1,
          totalVote: 12000,
          color: "ff7800",
        },
        chp: {
          partyAcronym: "CHP",
          partyName: "chp",
          partyPercantage: 10.1,
          totalVote: 25000,
          color: "a90000",
        },
      },
    },
    van: {
      color: "ff7800",
      parties: {
        akp: {
          partyAcronym: "AKP",
          partyName: "ak parti",
          partyPercantage: 10.1,
          totalVote: 12000,
          color: "ff7800",
        },
        chp: {
          partyAcronym: "CHP",
          partyName: "chp",
          partyPercantage: 10.1,
          totalVote: 25000,
          color: "a90000",
        },
        iyi: {
          partyAcronym: "İYİ",
          partyName: "iyi parti",
          partyPercantage: 10.1,
          totalVote: 10000,
          color: "0f94ca",
        },
        mhp: {
          partyAcronym: "MHP",
          partyName: "MHP",
          partyPercantage: 45.41,
          totalVote: 25000,
          color: "ff00ff",
        },
      },
    },
  },
  // cities: [
  // {
  //   id: "ankara",
  //   color: "ff7800",
  //   parties: [
  //     {
  //       partyAcronym: "AKP",s
  //       partyName: "ak parti",
  //       partyPercantage: 10.1,
  //       totalVote: 12000,
  //       color: "ff7800",
  //     },
  //     {
  //       partyAcronym: "CHP",
  //       partyName: "chp",
  //       partyPercantage: 10.1,
  //       totalVote: 25000,
  //       color: "a90000",
  //     },
  //     {
  //       partyAcronym: "İYİ",
  //       partyName: "iyi parti",
  //       partyPercantage: 10.1,
  //       totalVote: 10000,
  //       color: "0f94ca",
  //     },
  //   ],
  // },
  // {
  //   id: "istanbul",
  //   color: "ff7800",
  //   parties: [
  //     {
  //       partyAcronym: "AKP",
  //       partyName: "ak parti",
  //       partyPercantage: 10.1,
  //       totalVote: 12000,
  //       color: "ff7800",
  //     },
  //     {
  //       partyAcronym: "CHP",
  //       partyName: "chp",
  //       partyPercantage: 10.1,
  //       totalVote: 25000,
  //       color: "a90000",
  //     },
  //   ],
  // },
  // {
  //   id: "van",
  //   color: "ff7800",
  //   parties: [
  //     {
  //       partyAcronym: "AKP",
  //       partyName: "ak parti",
  //       partyPercantage: 10.1,
  //       totalVote: 12000,
  //       color: "ff7800",
  //     },
  //     {
  //       partyAcronym: "CHP",
  //       partyName: "chp",
  //       partyPercantage: 10.1,
  //       totalVote: 25000,
  //       color: "a90000",
  //     },
  //     {
  //       partyAcronym: "İYİ",
  //       partyName: "iyi parti",
  //       partyPercantage: 10.1,
  //       totalVote: 10000,
  //       color: "0f94ca",
  //     },
  //     {
  //       partyAcronym: "MHP",
  //       partyName: "MHP",
  //       partyPercantage: 45.41,
  //       totalVote: 25000,
  //       color: "ff00ff",
  //     },
  //   ],
  // },
  // ],
  patyPercentages: [
    {
      id: "ak parti",
      color: "ff7800",
      percentage: "35.63",
    },
    {
      id: "chp",
      color: "a90000",
      percentage: "25.35",
    },
    {
      id: "iyi parti",
      color: "0f94ca",
      percentage: "9.69",
    },
  ],
  generalInformation: {
    totalChest: "201.807",
    openedChest: "201.807",
    openedChestPercentage: "201.807",
    totalVoter: "201.807",
    usedVote: "201.807",
    validVote: "201.807",
  },
  totalNumberOfParties: ["AKP", "CHP", "İYİ", "MHP"],
};

const apiUrl = "https://turkeyMap/admin/data"; /// It can be changed according to the updated data url.
const isAdmin = apiUrl.split("/")[3] === "admin" ? true : false;

/// Function to fetch data from the backend for users.
async function fetchData() {
  try {
    const response = await fetch(`${apiUrl}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    // Assuming your backend returns data in JSON format
    const data = await response.json();
    fetchedData = data;

    // Display the data for users
    console.log("Data for users:", data);
  } catch (error) {
    console.error("Error fetching data for users:", error.message);
  }
}

/// Function to send data to the backend for admins.
async function sendDataToBackend(data) {
  try {
    const response = await fetch(
      `${apiUrl}/cities/${currentCity}/parties/${dropdownSelection}/totalvote`,
      {
        /// It can be changed according to the updated data url.
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    // Assuming your backend returns a response (e.g., success or updated data)
    const responseData = await response.json();
    fetchedData = responseData;

    // Display the response data for admins
    console.log("Response from server for admin:", responseData);
  } catch (error) {
    console.error("Error sending data for admin:", error.message);
  }
}

/// Bind the map container events and some CSS features.
function bindActionEvents() {
  if (isAdmin) {
    $(".button-class").off().on("click", onClickCity);
  } else {
    $(".button-class").off();
  }

  $("#submitAdminDataButton").off().on("click", onSubmitAdminData);

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

  $("#adminPanelInput").off().on("input", accesOnlyInteger);

  function accesOnlyInteger(e) {
    $(this).val(
      $(this)
        .val()
        .replace(/[^0-9]/g, "")
    );
  }

  function onClickCity(e) {
    const cityName = e.currentTarget.id;
    currentCity = cityName;
    $("#adminPanelCurrentCity").html(
      cityName.charAt(0).toUpperCase() + cityName.slice(1)
    );

    disableAdminPanel(false);
  }

  function onSubmitAdminData(e) {
    let dataToSendByAdmin = 0;
    let inputValue = Number($("#adminPanelInput").val()) || 0;
    dropdownSelection =
      $("#adminPanelDropdown").val() || $("#adminPanelDropdown:first").val();

    dummyData.Object.keys(cities).forEach((city, index) => {
      if (city.id === currentCity) {
        city.parties.forEach((party, index) => {
          if (party.partyAcronym === dropdownSelection) {
            dataToSendByAdmin = party.totalVote + inputValue; /// Change selected data on a variable.
          }
        });
      }
    });

    if (
      inputValue !== "" &&
      inputValue !== 0 &&
      inputValue !== undefined &&
      inputValue !== null
    ) {
      sendDataToBackend(dataToSendByAdmin); /// Send changed data to the backend.
    } else {
      alert("You should input your data correctly!");
    }
    // disableAdminPanel(true);
  }

  function onMouseoverCity(e) {
    const cityName = $(e.currentTarget).parent().attr("id");

    /// Set current city name.
    $(".movable-container-city-name").html(cityName.toUpperCase()); // cityName.charAt(0).toUpperCase() + cityName.slice(1)

    /// Find city data when mouse on over it.

    let tempData = dummyData.cities;
    Object.keys(tempData).forEach((item, index) => {
      if (item === cityName) {
        setCityData(tempData[item]);
      }
    });

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

  const onMoveMovableContainer = (e) => {
    let windowWidth = $(document).width();

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
}

/// Set fetched data to html elements.
function setPartyPercentagesData(data) {
  const parentDom = $(".political-parties-container");

  data.forEach((item, index) => {
    const newPartyDOM = $("<div></div>").addClass("political-party");
    parentDom.append(newPartyDOM);

    const newChild_1 = $("<div></div>")
      .addClass("political-party-color")
      .css("background-color", "#" + item.color);
    newPartyDOM.append(newChild_1);

    const newChild_2 = $("<div></div>")
      .addClass("political-party-name")
      .html(item.id);
    newPartyDOM.append(newChild_2);

    const newChild_3 = $("<div></div>")
      .addClass("political-party-percentage")
      .html(item.percentage);
    newPartyDOM.append(newChild_3);
  });
}

function setGeneralInformationData(data) {
  $("#election_report_totalChest_value").html(data.totalChest);
  $("#election_report_openedChect_value").html(data.openedChest);
  $("#election_report_openedChestPercentage_value").html(
    data.openedChestPercentage
  );
  $("#election_report_totalVoter_value").html(data.totalVoter);
  $("#election_report_usedVote_value").html(data.usedVote);
  $("#election_report_validVote_value").html(data.validVote);
}

function setCityData(data) {
  const parentDom = $(".movable-container-parties-container");

  /// Remove created uniques city data html elements.
  $(".movable-container-parties-wrapper").empty().remove();

  let tempData = data.parties;
  Object.keys(tempData).forEach((item, index) => {
    console.info(tempData[item]);
    const newPartyDOM = $("<div></div>").addClass(
      "movable-container-parties-wrapper"
    );
    parentDom.append(newPartyDOM);

    const newChild_1 = $("<div></div>").addClass(
      "movable-container-child-containers"
    );
    newPartyDOM.append(newChild_1);
    const newChildChild_1 = $("<div></div>")
      .addClass("movable-container-partyName movable-container-fontWeight")
      .html(tempData[item].partyName);
    newChild_1.append(newChildChild_1);

    const newChild_2 = $("<div></div>").addClass(
      "movable-container-child-containers"
    );
    newPartyDOM.append(newChild_2);
    const newChildChild_2 = $("<div></div>")
      .addClass(
        "movable-container-partyPercantage movable-container-fontSize movable-container-fontWeight"
      )
      .css("color", "#" + tempData[item].color)
      .html("%" + tempData[item].partyPercantage);
    newChild_2.append(newChildChild_2);

    const newChild_3 = $("<div></div>").addClass(
      "movable-container-child-containers"
    );
    newPartyDOM.append(newChild_3);
    const newChildChild_3 = $("<div></div>")
      .addClass(
        "movable-container-partyNumberOfVote movable-container-fontSize movable-container-fontWeight"
      )
      .css("color", "#" + tempData[item].color)
      .html(tempData[item].totalVote);
    newChild_3.append(newChildChild_3);
  });
}

function setPartiesTotheDropdown(data) {
  const parentDom = $("#adminPanelDropdown");

  /// Remove created uniques city data html elements.
  $(".movable-container-parties-wrapper").empty().remove();

  data.forEach((item, index) => {
    const newPartyDOM = $("<div></div>").addClass(
      "movable-container-parties-wrapper"
    );
    parentDom.append(newPartyDOM);

    const newChild_1 = $("<div></div>").addClass(
      "movable-container-child-containers"
    );
    newPartyDOM.append(newChild_1);
    const newChildChild_1 = $("<div></div>")
      .addClass("movable-container-partyName movable-container-fontWeight")
      .html(item.partyName);
    newChild_1.append(newChildChild_1);
  });
}

/// Util functions.
function disableAdminPanel(state) {
  if (state) {
    $("#adminPanelInput").attr("disabled", true);
    $("#adminPanelDropdown").attr("disabled", true);
    $("#submitAdminDataButton").attr("disabled", true);
  } else {
    $("#adminPanelInput").attr("disabled", false);
    $("#adminPanelDropdown").attr("disabled", false);
    $("#submitAdminDataButton").attr("disabled", false);
  }
}

/// Function for wrap all app. functions.
function initializeApplication() {
  fetchData();
  bindActionEvents();
  setPartyPercentagesData(dummyData.patyPercentages);
  setGeneralInformationData(dummyData.generalInformation);
  // setPartiesTotheDropdown(dummyData.allNameOfParties);

  if (!isAdmin) {
    $("#adminPanel").hide();
    $(".button-class").off().on("click", onClickCity);
  }
}

initializeApplication();
