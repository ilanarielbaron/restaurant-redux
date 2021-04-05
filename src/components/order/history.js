import React from "react"
import PropTypes from "prop-types"

export const History = ({historyArray}) => {
  console.log(historyArray)
  return (
    <div>
      {historyArray.map((history) => {
        return (
          <p key={history.id}>{history.from} - {history.to}</p>
        )
      })}
    </div>
  )
}

History.propTypes = {
  historyArray: PropTypes.array.isRequired
};
