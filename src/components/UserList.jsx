import PropTypes from 'prop-types'

export const UserList = ({ users, onDelete, onSalaryUp }) => {
  return (
    <div>
      <h1>User List</h1>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>surname</th>
            <th>salary</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className={user.salary > 800000 ? 'high-salary' : ''}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.surname}</td>
              <td>{user.salary} AMD</td>
              <td>
                <div className="button-group">
                  <button onClick={() => onDelete(user.id)}>Delete</button>
                  <button onClick={() => onSalaryUp(user.id, user.salary)}>Salary Up</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

UserList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string,
      name: PropTypes.string,
      surname: PropTypes.string,
      salary: PropTypes.number,
    })
  ),
  onDelete: PropTypes.func,
  onSalaryUp: PropTypes.func,
}
