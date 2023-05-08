// function setUpTable() {
//     const table = document.getElementById('tableCourse')
//     apiFetchAllCourses(table)
//   }
  
//   setUpTable()
// function setUpTable() {
//   const table = document.getElementById('tableCourse')
//   const btnSearch = document.getElementById('btnSearch')
//   const courseSearch = document.getElementById('courseSearch')


//   btnSearch.onclick = () => {

//       const searchTerm = courseSearch.value.trim()

//       if (searchTerm === '') {
//       alert('Please enter the course')
//       return
//       }

//       apiFetchAllCourseByName(table, document.getElementById('courseSearch').value)

//   }
//   apiFetchAllCourses(table)

// }
// setUpTable()
  
//   function populateActualData(table, courses) {
//     const grid = document.createElement('div')
//     grid.classList.add('newgrid')
//     for (const course of courses) {
//       const { courseId, courseName, facultyName, startDate, endDate } = course
//       const card = document.createElement('div')
//       card.classList.add('newcard')
//       const header = document.createElement('h2')
//       header.innerHTML = courseName
//       const faculty = document.createElement('p')
//       faculty.innerHTML = `Faculty: ${facultyName}`
//       const dates = document.createElement('p')
//       dates.innerHTML = `Schedule:${startDate} to ${endDate}`
//       const updateButton = document.createElement('button')
//       updateButton.innerHTML = 'Get Started'
//       updateButton.classList.add('btn', 'btn-success')
//       updateButton.setAttribute('data-id', courseId)
//       updateButton.addEventListener('click', (event) => {
//         const courseId = event.target.getAttribute('data-id')
//         window.location.href = `./course-details.html?id=${courseId}`
//       })
//       card.appendChild(header)
//       card.appendChild(faculty)
//       card.appendChild(dates)
//       card.appendChild(updateButton)
//       grid.appendChild(card)
//     }
//     table.appendChild(grid)
//   }
  
//   function apiFetchAllCourses(table) {
//     axios.get(`http://localhost:8080/courses/list`)
//         .then(res => {
//             const { data } = res
//             console.log(data)
//             const { sts, msg, bd } = data
//             populateActualData(table, bd)
//         })
//         .catch(err => console.log(err))
//   }

//   function apiFetchAllCourseByName(table, courseValue) {
//     const url = `http://localhost:8080/courses/name`
//     axios.get(url, {
//         params: {
//             courseName: courseValue
//         }
//     })
//         .then(res => {
//             const { data } = res
//             console.log(data)
//             const { sts, msg, bd } = data

//             // if (bd.length === 0) alert("No course found")

//             populateActualData(table, bd)  


//         })
//         .catch(err => console.log(err))
// }




function populateActualData(table, courses) {
  // check if there are any courses
  if (courses.length === 0) {
    alert('No courses found')
    const message = document.createElement('p')
    message.innerHTML = 'No courses found.'
    table.appendChild(message)
    return
  }

  // clear the table first
  table.innerHTML = ''

  const grid = document.createElement('div')
  grid.classList.add('newgrid')

  for (const course of courses) {
    const { courseId, courseName, facultyName, startDate, endDate } = course
    const card = document.createElement('div')
    card.classList.add('newcard')
    const header = document.createElement('h2')
    header.innerHTML = courseName
    const faculty = document.createElement('p')
    faculty.innerHTML = `Faculty: ${facultyName}`
    const dates = document.createElement('p')
    dates.innerHTML = `Schedule: ${startDate} to ${endDate}`
    const updateButton = document.createElement('button')
    updateButton.innerHTML = 'Get Started'
    updateButton.classList.add('btn', 'btn-success')
    updateButton.setAttribute('data-id', courseId)
    updateButton.addEventListener('click', (event) => {
      const courseId = event.target.getAttribute('data-id')
      window.location.href = `./course-details.html?id=${courseId}`
    })
    card.appendChild(header)
    card.appendChild(faculty)
    card.appendChild(dates)
    card.appendChild(updateButton)
    grid.appendChild(card)
  }

  table.appendChild(grid)
}

function apiFetchAllCourses(table) {
  axios.get('http://localhost:8080/courses/list')
      .then(res => {
          const { data } = res
          console.log(data)
          const { sts, msg, bd } = data
          populateActualData(table, bd)
      })
      .catch(err => console.log(err))
}

function setUpTable(table) {
  const btnSearch = document.getElementById('btnSearch')
  const courseSearch = document.getElementById('courseSearch')

  btnSearch.onclick = () => {
    const searchTerm = courseSearch.value.trim()

    if (searchTerm === '') {
      alert('Please enter the course')
      return
    }

    apiFetchAllCourseByName(table, searchTerm)
  }
}

apiFetchAllCourses(document.getElementById('tableCourse'))
setUpTable(document.getElementById('tableCourse'))


function apiFetchAllCourseByName(table, courseValue) {
  const url = 'http://localhost:8080/courses/name'
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

          populateActualData(table, bd)


      })
      .catch(err => console.log(err))
}