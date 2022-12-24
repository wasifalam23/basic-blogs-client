import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import './Input.scss';

const Input = (props) => {
  const inputClass = props.hasError
    ? 'input__box input__box--invalid'
    : 'input__box';

  const input = (
    <input
      id={props.id}
      type={props.type}
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
      placeholder={props.placeholder}
    />
  );

  const textArea = (
    <textarea
      id={props.id}
      onChange={props.onChange}
      value={props.value}
      onBlur={props.onBlur}
      placeholder={props.placeholder}
    />
  );

  return (
    <div className={`${inputClass} ${props.className}`}>
      {props.hasError && (
        <p className="input__error--msg">
          <FontAwesomeIcon
            icon={faExclamationTriangle}
            className="input__error--icon"
          />
          {props.errorMsg}
        </p>
      )}

      {props.field === 'input' && input}
      {props.field === 'textarea' && textArea}
    </div>
  );
};

export default Input;
