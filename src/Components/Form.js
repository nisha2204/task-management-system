import React from 'react'



const Form = () => {
    return (
        <div className="contact-form">
         <h4 className="alert">Your Responce Has Been Recorded</h4>
        <div className="form">
            <div className="form-name">
                <input type="text" name="name" id="name" required />
                <label className="label-name">
                    <span className="content-name">
              <h5>Name</h5>
            </span>
          </label>
        </div>
        <div className="form-name">
          <input type="text" name="domain" id="domain" required />
          <label className="label-name">
            <span className="content-name">
              <h5>Domain</h5>
            </span>
          </label>
        </div>
        <div className="form-name">
          <input type="text" name="task" id="task" required />
          <label className="label-name">
            <span className="content-name">
              <h5>Task Description</h5>
            </span>
          </label>
        </div>
        <div className="form-name">
          <input type="date" name="deadline" id="deadline" value="" required />
          <label className="label-name">
            <span className="content-name">
              <h5>Deadline</h5>
            </span>
          </label>
        </div>
        <div className="form-name">
          <input type="text" name="message" id="message" required />
          <label className="label-name">
            <span className="content-name">
              <h5>Message</h5>
            </span>
          </label>
        </div>
      </div>
      <button type="submit" id="submitButton">
        <svg
          width="30"
          height="30"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M36.6001 75.5V94.8C36.6001 96.1 37.5001 97.3 38.7001 97.8C40.0001 98.2 41.4001 97.8 42.2001 96.7L53.4001 81.3L36.6001 75.5Z"
            fill="#FCC85F"
          />
          <path
            d="M98.1999 2.60001C97.2999 1.90001 95.9999 1.90001 94.9999 2.40001L2.19995 51.4C0.699949 52.2 0.0999486 54.1 0.899949 55.7C1.29995 56.4 1.89995 56.9 2.59995 57.2L28.3999 66L83.2999 18.5L40.7999 70.3L83.9999 85.2C84.2999 85.3 84.6999 85.4 84.9999 85.4C85.5999 85.4 86.0999 85.2 86.5999 84.9C87.3999 84.4 87.8999 83.6 88.0999 82.7L99.4999 5.60001C99.5999 4.50001 99.0999 3.30001 98.1999 2.60001Z"
            fill="#FCC85F"
          />
        </svg>
      </button>
    </div>
    )
}

export default Form
