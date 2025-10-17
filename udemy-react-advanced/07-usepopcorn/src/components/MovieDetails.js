function MovieDetails({ selectedId, onCloseMovie }) {
    return (
        <div className="details">
            <button className="btn-back" onClick={onCloseMovie}>
                &larr;
            </button>
            {selectedId}
        </div>
    );
}
export default MovieDetails;
