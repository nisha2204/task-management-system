import React from 'react'
import '../Styles/filterbar.css'

const FilterBar = () => {

    const handleChange = (e) =>{
        const userInput = e.target.value.toUpperCase()
        const tasks = e.nativeEvent.path[4]
        const lists = tasks.querySelector('.lists')
        const items = lists.querySelectorAll('.item')
        items.forEach((item) => {
            const tagline = item.querySelector('.top-section .tagline').innerHTML.toUpperCase()
            const deadline = item.querySelector('.bottom-section .duration .date').innerHTML.toUpperCase()
            const name = item.querySelector('.bottom-section .profile .name').innerHTML.toUpperCase()
            const domain = item.querySelector('.bottom-section .profile .domain').innerHTML.toUpperCase()

            if(tagline.indexOf(userInput) > -1 || deadline.indexOf(userInput) > -1 || name.indexOf(userInput) > -1 ||domain.indexOf(userInput) > -1){
                item.style.display = "flex"
            }
            else{
                item.style.display = "none"
            }
        })
    }

    const filter = (e) => {
        const select = document.querySelector('#filter')
        const userValue = select.value
        const tasks = e.nativeEvent.path[4]
        const lists = tasks.querySelector('.lists')
        const items = lists.querySelectorAll('.item')
        items.forEach((item) => {
            item.style.display = 'none'
            if(userValue === 'Completed'){
                items.forEach(item => {
                    if (item.getAttribute('data-status') === 'true'){
                        item.style.display = 'flex'
                    }
                })
            }

            else if(userValue === 'Pending'){
                items.forEach(item => {
                    if (item.getAttribute('data-status') === 'false'){
                        item.style.display = 'flex'
                    }
                })
            }

            else{
                items.forEach(item => {
                    item.style.display = 'flex'
                })
            }
            // console.log(item.getAttribute('data-status'))
        })
    } 
    return (
        <div className="filter-container">
        <div className="search-bar">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M23.111 20.058L18.134 15.081C19.099 13.561 19.657 11.759 19.657 9.83C19.657 4.41 15.248 0 9.828 0C4.408 0 0 4.41 0 9.83C0 15.25 4.408 19.66 9.829 19.66C11.663 19.66 13.381 19.155 14.851 18.277L19.872 23.298C22.016 25.439 25.256 22.202 23.111 20.058ZM3.047 9.83C3.047 6.091 6.09 3.048 9.829 3.048C13.568 3.048 16.611 6.09 16.611 9.83C16.611 13.57 13.568 16.612 9.829 16.612C6.09 16.612 3.047 13.569 3.047 9.83V9.83ZM5.057 8.066C7.041 3.467 13.721 4 14.979 8.815C12.445 5.841 7.986 5.521 5.057 8.066Z"
              fill="#BAC8DF"
            />
          </svg>
          <input onChange = {handleChange} type="text" id="search-bar" placeholder="Search" />
        </div>
        <div className="filter-options">
          <select id="filter"
          onChange = {filter} >
            <option value="All">All</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
      </div>
    )
}

export default FilterBar
