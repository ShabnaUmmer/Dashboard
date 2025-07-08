import React from 'react'
import {IoIosArrowUp, IoIosArrowDown} from 'react-icons/io'
import {CiSearch} from 'react-icons/ci'
import apiService from '../services/api'
import CommentTable from '../components/CommentTable'
import Pagination from '../components/Pagination'
import Navbar from '../components/Navbar'
import '../styles/Dashboard.css'
import storageService from '../services/storage'

class Dashboard extends React.Component {
  state = {
    user: null,
    comments: [],
    filteredComments: [],
    currentPage: 1,
    pageSize: 10,
    searchQuery: '',
    sortBy: '',
    sortOrder: '',
    isLoading: true,
  }

  async componentDidMount() {
    const savedState = storageService.loadDashboardState()

    const [commentsData, userData] = await Promise.all([
      apiService.fetchComments(),
      apiService.fetchFirstUser(),
    ])

    this.setState(
      {
        comments: commentsData,
        user: userData,
        ...savedState,
        isLoading: false,
      },
      this.applyFilters,
    )
  }

  componentDidUpdate(prevProps, prevState) {
    const {currentPage, pageSize, searchQuery, sortBy, sortOrder} = this.state
    if (
      currentPage !== prevState.currentPage ||
      pageSize !== prevState.pageSize ||
      searchQuery !== prevState.searchQuery ||
      sortBy !== prevState.sortBy ||
      sortOrder !== prevState.sortOrder
    ) {
      storageService.saveDashboardState({
        currentPage,
        pageSize,
        searchQuery,
        sortBy,
        sortOrder,
      })
    }
  }

  applyFilters = () => {
    const {comments, searchQuery, sortBy, sortOrder} = this.state

    let filtered = [...comments]

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        comment =>
          comment.name.toLowerCase().includes(query) ||
          comment.email.toLowerCase().includes(query) ||
          comment.body.toLowerCase().includes(query),
      )
    }

    if (sortBy && sortOrder) {
      filtered.sort((a, b) => {
        if (sortBy === 'postId') {
          return sortOrder === 'asc' ? a.postId - b.postId : b.postId - a.postId
        }
        const valA = a[sortBy].toString().toLowerCase()
        const valB = b[sortBy].toString().toLowerCase()
        if (valA < valB) return sortOrder === 'asc' ? -1 : 1
        if (valA > valB) return sortOrder === 'asc' ? 1 : -1
        return 0
      })
    }

    this.setState({filteredComments: filtered})
  }

  getPaginatedComments = () => {
    const {filteredComments, currentPage, pageSize} = this.state
    const start = (currentPage - 1) * pageSize
    const end = start + pageSize
    return filteredComments.slice(start, end)
  }

  getTotalPages = () => {
    return Math.ceil(this.state.filteredComments.length / this.state.pageSize)
  }

  handleSearch = query => {
    this.setState({searchQuery: query, currentPage: 1}, this.applyFilters)
  }

  handleSort = key => {
    this.setState(prevState => {
      let sortBy = key
      let sortOrder = 'asc'

      if (prevState.sortBy === key) {
        if (prevState.sortOrder === 'asc') sortOrder = 'desc'
        else if (prevState.sortOrder === 'desc') {
          sortBy = ''
          sortOrder = ''
        }
      }

      return {
        sortBy,
        sortOrder,
        currentPage: 1,
      }
    }, this.applyFilters)
  }

  renderSortBoxes = () => {
    const {sortBy, sortOrder} = this.state

    const sortOptions = [
      {key: 'postId', label: 'Post ID'},
      {key: 'name', label: 'Name'},
      {key: 'email', label: 'Email'},
    ]

    return (
      <div className="sort-controls">
        <div className="sort-control-wrapper">
          <div className="sort-boxes">
            {sortOptions.map(option => {
              const isActive = sortBy === option.key
              const isAsc = isActive && sortOrder === 'asc'
              const isDesc = isActive && sortOrder === 'desc'

              return (
                <div
                  key={option.key}
                  className={`sort-box ${isActive ? 'active' : ''}`}
                  onClick={() => this.handleSort(option.key)}
                >
                  <span>Sort {option.label}</span>
                  <div className="sort-arrows">
                    <IoIosArrowUp
                      className={`arrow-up ${isAsc ? 'active' : ''}`}
                    />
                    <IoIosArrowDown
                      className={`arrow-down ${isDesc ? 'active' : ''}`}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          <div className="search-control">
            <CiSearch size={25} />
            <input
              className="search-input"
              type="text"
              placeholder="Search name, email, comment"
              value={this.state.searchQuery}
              onChange={e => this.handleSearch(e.target.value)}
            />
          </div>
        </div>
      </div>
    )
  }

  handlePageChange = page => {
    this.setState({currentPage: page})
  }

  handlePageSizeChange = size => {
    this.setState({pageSize: size, currentPage: 1})
  }

  render() {
    const {isLoading, user} = this.state

    if (isLoading)
      return (
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      )

    const paginatedComments = this.getPaginatedComments()
    const totalPages = this.getTotalPages()

    return (
      <>
        <Navbar user={user} />
        <div className="dashboard-container">
          <div>{this.renderSortBoxes()}</div>
          <CommentTable comments={paginatedComments} />
          <Pagination
            currentPage={this.state.currentPage}
            totalItems={this.state.filteredComments.length}
            totalPages={totalPages}
            pageSize={this.state.pageSize}
            onPageChange={this.handlePageChange}
            onPageSizeChange={this.handlePageSizeChange}
          />
        </div>
      </>
    )
  }
}

export default Dashboard
