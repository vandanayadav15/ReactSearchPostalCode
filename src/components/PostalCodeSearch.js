import React, { useState } from "react";

function PostalCodeSearch() {
  const [postalCode, setPostalCode] = useState("");
  const [postalData, setPostalData] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleFilterChange(event) {
    setFilterValue(event.target.value);
  }

  function handleFetchClick() {
    setErrorMessage("");
    if (postalCode.length !== 6) {
      setErrorMessage("Postal code must be 6 digits");
      return;
    }
    fetch(`https://api.postalpincode.in/pincode/${postalCode}`)
      .then((response) => response.json())
      .then((data) => {
        if (data[0].Status === "Success") {
          setPostalData(data[0].PostOffice);
        } else {
          setErrorMessage("Error fetching postal data");
        }
      })
      .catch((error) => {
        setErrorMessage(`Error fetching postal data: ${error.message}`);
      });
  }

  const filteredData = postalData.filter((postOffice) =>
    postOffice.Name.toLowerCase().includes(filterValue.toLowerCase())
  );
  const numResults = filteredData.length;

  return (
    <div className="container">
      <h2>Enter Pincode</h2>
      <input
        type="text"
        placeholder="Pincode"
        value={postalCode}
        onChange={(event) => setPostalCode(event.target.value)}
      />
      <br></br>
      <button onClick={handleFetchClick}>Lookup</button>
      <br></br>

      {errorMessage && <div>{errorMessage}</div>}
      {postalData.length > 0 && (
        <div className="container2">
          <div className="message">
            <b>Message</b> : Number of pincode {numResults}{" "}
            {numResults === 1 ? "result" : "found"} 
          </div>
          <input
            type="text"
            value={filterValue}
            onChange={handleFilterChange}
            placeholder="Filter"
          />
          
          {filteredData.length === 0 ? (
            <div>Couldn't find the postal data you're looking for...</div>
          ) : (
            <div>
              {/* <div>pincode: {""}</div> */}

              {filteredData.map((postOffice) => (
                <div className="box">
                  <p key={postOffice.pincode}>
                    <p>Name : {postOffice.Name}</p>
                    <p>BranchType : {postOffice.BranchType}</p>
                    <p>DeliveryStatus : {postOffice.DeliveryStatus}</p>
                    <p>Division : {postOffice.Division}</p>
                    <p>State : {postOffice.State}</p>
                    <p>Pincode : {postOffice.Pincode}</p>{" "}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PostalCodeSearch;


