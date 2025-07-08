import '../styles/components/commentTable.css'

const CommentTable = ({ comments }) => {
  return (
    <div className="table-container">
      <table className="comment-table">
        <thead>
          <tr>
            <th>Post ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          {comments.map(comment => (
            <tr key={comment.id}>
              <td className="table-contents">{comment.postId}</td>
              <td className="table-contents">{comment.name}</td>
              <td className="table-contents">{comment.email}</td>
              <td className="table-contents comment-body">{comment.body}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CommentTable