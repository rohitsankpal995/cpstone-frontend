function setUpTable() {
    const table = document.getElementById('tableCourse')
    const courseSearch = document.getElementById('courseSearch')
  
  
    btnSearch.onclick = () => {
  
        const searchTerm = courseSearch.value.trim()
  
        if (searchTerm === '') {
            alert('Please enter the course')
            return
        }
  
        apiFetchAllCourseByName(table, document.getElementById('courseSearch').value)
  
    }
  
    apiFetchAllCourses(table)
  
  
  }

setUpTable()



function propulateActualData(table, courses) {
    while (table.rows.length > 0) {
        table.deleteRow(table.rows.length - 1);
    }

    if (courses.length === 0) {
        alert('No course found')
        const row = table.insertRow()
        const cell = row.insertCell(0)
        cell.colSpan = 7
        cell.innerHTML = 'No courses found.'
        return
    }


    for(const course of courses) {

        const { courseId, courseName, facultyName, material,recording,startDate,endDate } = course

        const updatePageUrl = `../teacher/updateCourse.html?courseId=${courseId}`
        const viewPageUrl = `../studnet/course-details.html?courseId=${courseId}`


        const row = table.insertRow()
        row.insertCell(0).innerHTML = courseId
        row.insertCell(1).innerHTML = courseName
        row.insertCell(2).innerHTML = facultyName   
        row.insertCell(3).innerHTML = `<a href="${material}">Browse</a>`
        row.insertCell(4).innerHTML = `<a href="${recording}">Recordings</a>`
        row.insertCell(5).innerHTML = startDate
        row.insertCell(6).innerHTML = endDate
        row.insertCell(7).innerHTML = `
       
        <a class='ms-2' href='${updatePageUrl}'>Update</a> 
        <a class='ms-2' href='#' onclick='showConfirmDeleteModal(${courseId})'>Delete</a>`
    }
}

// function apiFetchAllCourses(table) {
//     axios.get(`http://localhost:8080/courses/list`)
//         .then(res => {
//             const { data } = res
//             console.log(data)  
//             const { sts, msg, bd } = data

//             propulateActualData(table, bd)
//         })
//         .catch(err => console.log(err))
        
// }
function deleteCourse(id) {
    console.log(id)
    //id = Number(id);
    axios.delete(`http://localhost:8080/courses/delete/${id}`)
        .then(function (response) {
            console.log('Course deleted')
            window.alert("Course deleted successfully")

        })
        .catch(function (error) {
            // Handle error response
            console.log(error)
        })
}

function apiFetchAllCourseByName(table, courseValue) {
    const url = `http://localhost:8080/courses/name`
    axios.get(url, {
        params: {
            courseName: courseValue
        }
    })
        .then(res => {
            const { data } = res
            console.log(data)
            const { sts, msg, bd } = data

            // if (bd.length === 0) alert("No course found")

            propulateActualData(table, bd)  


        })
        .catch(err => console.log(err))
 }


function apiFetchAllCourses(table) {
    axios.get(`http://localhost:8080/courses/list`)
        .then(res => {
            const { data } = res
            console.log(data)  
            const { sts, msg, bd } = data

            propulateActualData(table, bd)
        })
        .catch(err => console.log(err))
        
}







function apiCallDeleteCourse(courseId, modal) {
    const url = `http://localhost:8080/courses/delete/${courseId}`

    axios.delete(url)
        .then(res => res.data) // you converted complete response in to our business reponse
        // .then( data => console.log(data.msg) ) // this line can be written in destructured form as below
        .then( ({ sts, msg, bd }) =>  modal.hide())
        .then (window.location.reload())
        .catch(console.log)
}

// function apiFetchAllCourses(table) {
//     axios.get('http://localhost:8080/course/list')
//         .then(res => {
//             const { data } = res
//             console.log(data)
//             const { sts, msg, bd } = data
//             populateActualData(table, bd)
//         })
//         .catch(err => console.log(err))
// }

function showConfirmDeleteModal(courseId) {
    console.log('clicked ' + courseId)
    const myModalEl = document.getElementById('deleteModal');
    const modal = new bootstrap.Modal(myModalEl)
    modal.show()

    const btDl = document.getElementById('btDl')
    btDl.onclick = () => {
        apiCallDeleteCourse(courseId, modal)
        
        window.location.reload()
        
    }
}

