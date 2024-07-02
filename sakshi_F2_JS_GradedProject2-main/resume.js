
document.addEventListener('DOMContentLoaded', function () {
    fetchApplicants();
});

let currentApplicantIndex = 0;
let filteredApplicants = [];
let applicants = [];

function fetchApplicants() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            applicants = data.resume;
            console.log("Data loaded successfully", applicants);
        })
        .catch(error => {
            console.error('Error loading the data:', error);
            document.getElementById('personalInfo').innerHTML = 'Failed to load applicant data.';
        });
}

function displayApplicant(index) {
    if (index < 0 || index >= filteredApplicants.length) {
        console.error("Index out of bounds");
        return;
    }
    const applicant = filteredApplicants[index];
    injectBasicInfo(applicant.basics);
    injectWorkDetails(applicant.work);
    injectInternshipDetails(applicant.internship);
    injectEducationDetails(applicant.education);
    injectProjectDetails(applicant.projects);
    injectAchievementDetails(applicant.achievements);
    injectInterestDetails(applicant.interests);
    injectSkillsDetails(applicant.skills);
    let results = document.querySelector('.results');
    results.style.display = 'grid';
    updateNavigationButtons();
}

function setElementText(id, text) {
    let element = document.getElementById(id);
    if (element) {
        element.textContent = text;
    }
}

function setElementSrc(id, src) {
    let element = document.getElementById(id);
    if (element) {
        element.src = src;
    }
}

function setElementHref(id, href, text) {
    let element = document.getElementById(id);
    if (element) {
        element.href = href;
        element.textContent = text;
    }
}

function injectBasicInfo(basics) {
    setElementText('name', basics.name || 'Not Available');
    setElementText('appliedFor', basics.AppliedFor || 'Not Specified');
    // setElementSrc('profilePicture', basics.image || 'media/avatar.png'); Update : Github not tracking media folders. 
    setElementSrc('profilePicture', basics.image || 'avatar.png'); 
    setElementText('email', 'Email: ' + (basics.email || 'No Email Provided'));
    setElementText('phone', 'Phone Number:' + (basics.phone || 'No Phone Provided'));
    setElementText('location', 'Location: ' + formatLocation(basics.location));
    setElementText('linkedin', basics.profiles ? basics.profiles.url : '#', basics.profiles ? basics.profiles.network : 'No LinkedIn Profile');
}

function formatLocation(location) {
    if (!location) return 'Location Not Provided';
    return `${location.address || ''}, ${location.city || ''}, ${location.state || ''}, ${location.postalCode || ''}`.replace(/,\s*$/, '');
}

function injectWorkDetails(work) {
    if (!work) {
        document.getElementById('workDetails').innerHTML = 'No work experience provided.';
    } else {
        let details = `<span id="s-strong" >Company Name:</span> ${work['Company Name'] || 'Not Available'}<br>
                       <span id="s-strong" >Position:</span> ${work.Position || 'Not Available'}<br>
                       <span id="s-strong" >Start Date:</span> ${work['Start Date'] || 'Not Available'}<br>
                       <span id="s-strong" >End Date:</span> ${work['End Date'] || 'Not Available'}<br>
                       <span id="s-strong" >Summary:</span> ${work.Summary || 'No summary provided'}`;
        document.getElementById('workExperienceDetails').innerHTML = details;
    }
}

function injectInternshipDetails(internship) {
    if (!internship) {
        document.getElementById('internshipDetails').innerHTML = 'No internship details provided.';
    } else {
        let details = `<span id="s-strong" >Company Name:</span> ${internship['Company Name'] || 'Not Available'}<br>
                       <span id="s-strong" >Position:</span> ${internship.Position || 'Not Available'}<br>
                       <span id="s-strong" >Start Date:</span> ${internship['Start Date'] || 'Not Available'}<br>
                       <span id="s-strong" >End Date:</span> ${internship['End Date'] || 'Not Available'}<br>
                       <span id="s-strong" >Summary:</span> ${internship.Summary || 'No summary provided'}`;
        document.getElementById('internshipDetails').innerHTML = details;
    }
}

function injectSkillsDetails(skills) {
    if (!skills) {
        document.getElementById('skillsDetails').innerHTML = 'No skills provided.';
    } else {
        let skillsContent = `<span id="s-strong" >Skill:</span> ${skills.name}<br><span id="s-strong" >Skill Level:</span> ${skills.level}<br>
                             <span id="s-strong" >Technical Skills:</span> <br> ${skills.keywords.join(', ')}`;
        document.getElementById('skillsDetails').innerHTML = skillsContent;
    }
}



function injectEducationDetails(education) {
    if (!education) {
        document.getElementById('educationDetails').innerHTML = 'No education details provided.';
    } else {
        let details = '';
        if (education.UG) {
            details += `<span id="s-strong" >Undergraduate:</span> <br> ${education.UG.institute} ${education.UG.course} - CGPA: ${education.UG.cgpa}<br>`;
        }
        if (education['Senior Secondary']) {
            details += `<span id="s-strong" >Senior Secondary:</span> <br> ${education['Senior Secondary'].institute} - CGPA: ${education['Senior Secondary'].cgpa}<br>`;
        }
        if (education['High School']) {
            details += `<span id="s-strong" >High School:</span> <br> ${education['High School'].institute} - CGPA: ${education['High School'].cgpa}`;
        }
        document.getElementById('educationDetails').innerHTML = details;
    }
}

function injectProjectDetails(projects) {
    if (!projects) {
        document.getElementById('projectDetails').innerHTML = 'No project details provided.';
    } else {
        let details = `<span id="s-strong" >Project Name:</span> ${projects.name}<br>
                       <span id="s-strong" >Description:</span> ${projects.description}`;
        document.getElementById('projectDetails').innerHTML = details;
    }
}


function injectAchievementDetails(achievements) {
    if (achievements && achievements.Summary && achievements.Summary.length > 0) {
        let details = `<span id="s-strong" >Achievements:</span><br>`;
        achievements.Summary.forEach(achievement => {
            details += `${achievement}<br>`;
        });
        document.getElementById('achievementDetails').innerHTML = details;
    } else {
        document.getElementById('achievementDetails').innerHTML = 'No achievements provided.';
    }
}

function injectInterestDetails(interests) {
    if (!interests || !interests.hobbies || interests.hobbies.length === 0) {
        document.getElementById('interestDetails').innerHTML = 'No interests provided.';
    } else {
        let details = `<span id="s-strong" >Interests: </span> <br> ${interests.hobbies.join(", ")}`;
        document.getElementById('interestDetails').innerHTML = details;
    }
}

function navigate(direction) {
    let newIndex = currentApplicantIndex + direction;
    if (newIndex >= 0 && newIndex < filteredApplicants.length) {
        currentApplicantIndex = newIndex;
        displayApplicant(currentApplicantIndex);
    }
}

function updateNavigationButtons() {
    document.getElementById('prevButton').disabled = currentApplicantIndex === 0;
    document.getElementById('nextButton').disabled = currentApplicantIndex === filteredApplicants.length - 1;
}

function filterResumes() {
    const searchTerm = document.getElementById('searchJob').value.toLowerCase().trim();

    filteredApplicants = applicants.filter(applicant => {
        let searchString = [
            applicant.basics.name,
            applicant.basics.AppliedFor,
            applicant.basics.email,
            applicant.basics.phone,
            applicant.basics.location.address,
            applicant.basics.location.postalCode,
            applicant.basics.location.city,
            applicant.basics.location.state,
            applicant.basics.profiles.network,
            applicant.basics.profiles.url,
            applicant.skills.name,
            applicant.skills.level,
            applicant.skills.keywords.join(' '),
            applicant.work ? applicant.work['Company Name'] : '',
            applicant.work ? applicant.work.Position : '',
            applicant.work ? applicant.work.Summary : '',
            applicant.internship ? applicant.internship['Company Name'] : '',
            applicant.internship ? applicant.internship.Position : '',
            applicant.internship ? applicant.internship.Summary : '',
            applicant.education ? (applicant.education.UG ? applicant.education.UG.institute + " " + applicant.education.UG.course : '') : '',
        ].join(' ').toLowerCase();

        return searchString.includes(searchTerm);
    });

    if (filteredApplicants.length === 0) {
        document.querySelector('.results').style.display = 'none';
        new bootstrap.Modal(document.getElementById('noResultsModal')).show();
    } else {
        currentApplicantIndex = 0;
        displayApplicant(currentApplicantIndex);
    }
}

function clearResults() {
    document.querySelector('.results').style.display = 'none';
}

function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    window.location.href = 'index.html';
}
