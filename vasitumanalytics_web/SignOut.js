SignOut = function()
{
    localStorage.removeItem("REST-AUTH-TOKEN");
    window.location.href = "SignOut.html";
}