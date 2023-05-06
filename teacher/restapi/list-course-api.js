function setUpTable() {
    const table = document.getElementById('tableCourse')
    apiFetchAllCourses(table)

}

setUpTable()

function populateActualData(table, courses) {
    for (const course of courses) {

        const { id, courseName, facultyName, startDate, endDate, material, recording } = course
        const updatePageUrl = `./update-course.html?id=${id}`


        // './update-course.html?id=${id}'
        const viewPageUrl = `./view-course.html?id=${id}`

        const row = table.insertRow()

        row.insertCell(0).innerHTML = id
        row.insertCell(1).innerHTML = courseName
        row.insertCell(2).innerHTML = facultyName
        row.insertCell(3).innerHTML = startDate
        row.insertCell(4).innerHTML = endDate
        row.insertCell(5).innerHTML = material
        row.insertCell(6).innerHTML = recording
        row.insertCell(7).innerHTML = `
            <a class = "btn btn-primary" href='${viewPageUrl}'>View</a>
            <a class = "btn btn-primary" href='${updatePageUrl}'>Update</a>
            <a class="btn btn-danger" onclick='deleteCourse(${id})'>Delete</a>`



    }
}

function apiFetchAllInvoices(table) {
    axios.get('http://localhost:8080/invoice/')
        .then(res => {
            const { data } = res
            console.log(data)
            const { sts, msg, bd } = data

            propulateActualData(table, bd)
        })
        .catch(err => console.log(err))
}



function deleteCourse(id) {
    console.log(id)
    //id = Number(id);
    axios.delete('http://localhost:8080/course/${id}')
        .then(function (response) {
            console.log('Course deleted')
            window.alert("Course deleted successfully")

        })
        .catch(function (error) {
            // Handle error response
            console.log(error)
        })
}





function apiFetchAllCourses(table) {
    axios.get('http://localhost:8080/course/')
        .then(res => {
            const { data } = res
            console.log(data)
            const { sts, msg, bd } = data
            populateActualData(table, bd)
        })
        .catch(err => console.log(err))
}

// function apiCallDeleteCourse(id, modal){
//     const url= 'http://localhost:8080/course/${id}'
//     axios.delete(url)
//         .then(res => res.data)
//         .then( ({ sts, msg, bd }) =>  modal.hide() )
//         .catch(console.log)
// }