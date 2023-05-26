function setUpTable() {
    const table = document.getElementById('tableCourse')
    apiFetchAllUsers(table)
  }

setUpTable()



function propulateActualData(table, courses) {
    while (table.rows.length > 0) {
        table.deleteRow(table.rows.length - 1);
    }
    for(const course of courses) {

        const { userId, userName,role } = course

        const updatePageUrl = `../teacher/updateCourse.html?courseId=${userId}`
        const viewPageUrl = `../studnet/course-details.html?courseId=${userId}`


        const row = table.insertRow()
        row.insertCell(0).innerHTML = userId
        row.insertCell(1).innerHTML = userName
        row.insertCell(2).innerHTML = role   
      
        row.insertCell(3).innerHTML = `
       
        <a class='ms-2' href='${updatePageUrl}'>Update</a> 
        <a class='ms-2' href='#' onclick='showConfirmDeleteModal(${userId})'>Delete</a>`
    }
}

function apiFetchAllUsers(table) {
    axios.get('http://localhost:8080/user/users')
        .then(res => {
           
            const { data } = res
             
            const { sts, msg, bd } = data

            propulateActualData(table, bd)
        })
        .catch(err => console.log(err))
}
