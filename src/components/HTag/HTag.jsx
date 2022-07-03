import propTypes from 'prop-types';
import s from './HTag.module.css';

const HTag = ({ title }) => {
  return <h2 className={s.title}>{title}</h2>;
};

export default HTag;

HTag.propTypes = {
  title: propTypes.string.isRequired,
};
