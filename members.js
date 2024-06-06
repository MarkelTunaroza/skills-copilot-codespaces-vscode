function skillsMember() {
    var member = document.getElementById("member").value;
    var memberSkills = document.getElementById("memberSkills").value;
    
    var memberSkillsArray = memberSkills.split(",");
    var memberSkillsList = "<ul>";
    for (var i = 0; i < memberSkillsArray.length; i++) {
        memberSkillsList += "<li>" + memberSkillsArray[i] + "</li>";
    }
    memberSkillsList += "</ul>";
    
    var output = "<h2>Member: " + member + "</h2>";
    output += "<h3>Skills:</h3>";
    output += memberSkillsList;
    
    document.getElementById("output").innerHTML = output;
}