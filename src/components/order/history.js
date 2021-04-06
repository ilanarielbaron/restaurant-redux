import React from "react"
import PropTypes from "prop-types"

export const History = ({ historyArray }) => {
  return (
    <div>
      {historyArray.map((history) => {
        return (
          <p key={history.id}>From: {history.from} - To: {history.to}</p>
        )
      })}
    </div>
  )
}

History.propTypes = {
  historyArray: PropTypes.array.isRequired
};
