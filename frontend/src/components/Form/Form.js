import './Form.css';
import React from 'react';
import { emailInput, saveEmail, shareByURL } from "../../store/actions";
import { connect } from "react-redux";
import SOCIALS from "./socials";
import { isEmailValid, isFormDisabled } from "../../store/reducers";

const Form = ({ user, isFormDisabled, isEmailValid, share, emailInput, saveEmail }) => (
  <form className="form" onSubmit={e => { e.preventDefault(); saveEmail(user); }}>
    <div className="form__container">
      <div className="form__title">Чтобы выиграть путешествие</div>
      <div className="form__field">
        { user.shared
          ? <div className="form__passed"/>
          : <div className="form__step">1.</div>
        }
        <div className={ `form__control ${user.shared ? 'form__control_muted' : ''}` }>
          <div className="form__subtitle"><span>Поделись с друзьями</span></div>
          <div className="form__socials">
            {SOCIALS.map(({ key, url }) => (
              <figure
                key={key}
                className={`form__provider form__provider_${key}`}
                onClick={() => share(url, user)}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="form__field">
        { user.email
          ? <div className="form__passed" />
          : <div className="form__step">2.</div>
        }
        <div className={ `form__control ${user.email ? 'form__control_muted' : ''}` }>
          <div className="form__subtitle"><span>Оставь почту</span></div>
          <input
            className="form__input"
            value={user.email || user.draftEmail || ''}
            readOnly={!!user.email}
            onChange={({ target }) => emailInput(target.value)}/>
          <button className="form__btn" disabled={isFormDisabled}>Отправить</button>
        </div>
      </div>
    </div>
  </form>
);

function mapStateToProps(state) {
  return {
    user: state.user,
    isFormDisabled: isFormDisabled(state),
    isEmailValid: isEmailValid(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    share: (url, user) => dispatch(shareByURL(url, user.id)),
    emailInput: email => dispatch(emailInput(email)),
    saveEmail: user => dispatch(saveEmail(user.draftEmail, user.id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);