async function liveRegController(cmd, serverDataObj, hostUrl) {
  //handle pause/resume
  if (cmd == "pause") {
    if (document.getElementById("pause").value == "pause") {
      document.getElementById("pause").value = "resume";
    } else {
      document.getElementById("pause").value = "pause";
      cmd = "resume";
    }
  }

  if (!serverDataObj.current)
    serverDataObj.current = {
      comment: document.getElementById("liveRegCmnt").value,
    };

  let res = await fetch(`${hostUrl}/liveReg/${cmd}/`, {
    method: "POST",
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer",
    body: JSON.stringify(serverDataObj),
  });
  let json = await res.json();
  if (res.status == 200) {
    serverDataObj = json;
  } else if (json.error) {
    alert(json.error);
  } else {
    alert("Error from server: " + res.statusText);
  }
  console.log(json);
}
