function skillsMember() {
    var members = document.getElementsByClassName('member');
    var i;
    for (i = 0; i < members.length; i++) {
        members[i].style.display = "none";
    }
    var skill = document.getElementById('skills').value;
    var filtered = [];
    for (i = 0; i < members.length; i++) {
        var skills = members[i].getElementsByClassName('skills')[0].innerHTML.split(', ');
        if (skills.includes(skill)) {
            filtered.push(members[i]);
        }
    }
    for (i = 0; i < filtered.length; i++) {
        filtered[i].style.display = "block";
    }
}