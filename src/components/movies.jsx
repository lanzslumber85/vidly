import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import "../index.css";
import Like from "../components/common/like.jsx";
import Pagination from "./common/pagination.jsx";
import { paginate } from "../utils/paginate.js";
import ListGroup from "./common/listGroup.jsx";
import { getGenres } from "../services/fakeGenreService";

class Movies extends Component {
  state = {
    movies: [],
    currentPage: 1,
    pageSize: 4,
    genres: [],
  };

  componentDidMount() {
    const genres = [{ name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  handleDelete = (movieObj) => {
    const updated = this.state.movies.filter(
      (theOtherList) => theOtherList._id !== movieObj._id
    );
    this.setState({ movies: updated });
  };

  renderButtonDelete = (movieObj) => {
    return (
      <button
        className="btn btn-danger btn-sm m-2"
        onClick={() => this.handleDelete(movieObj)}
      >
        Delete
      </button>
    );
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  renderTableData = (movies) => {
    return movies.map((movie) => {
      const { title, numberInStock, dailyRentalRate } = movie;
      const { name } = movie.genre;
      return (
        <tr key={movie._id}>
          <td>{title}</td>
          <td>{name}</td>
          <td>{numberInStock}</td>
          <td>{dailyRentalRate}</td>
          <td>
            <Like liked={movie.liked} onClick={() => this.handleLike(movie)} />
          </td>
          <td>{this.renderButtonDelete(movie)}</td>
        </tr>
      );
    });
  };

  renderTableHeader = () => {
    return (
      <tr>
        <th scope="col">Title</th>
        <th scope="col">Genre</th>
        <th scope="col">Stock</th>
        <th scope="col">Rate</th>
        <th />
        <th />
      </tr>
    );
  };

  getClassBadge = () => {
    let classes = `badge badge-`;
    classes += this.state.movies.length === 0 ? `warning` : `primary`;
    return classes;
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  render() {
    const {
      pageSize,
      currentPage,
      selectedGenre,
      movies: allMovies,
    } = this.state;
    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;
    const movies = paginate(filtered, currentPage, pageSize);
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <h3 id="title">
            Showing{" "}
            <span className={this.getClassBadge()}>{filtered.length}</span>{" "}
            movies in the database.
          </h3>

          <table className="table">
            <thead>{this.renderTableHeader()}</thead>
            <tbody>{this.renderTableData(movies)}</tbody>
          </table>

          <Pagination
            itemsCount={filtered.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
