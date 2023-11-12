import React from 'react'
import DetailCard from '../../../components/Card/DetailCard';
import classes from './HomeTaylor.module.scss';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ApplicationToast } from '../../../components/Toast/ApplicationToast';
import { Alert } from 'react-bootstrap';

const HomeTaylor = () => {
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const handleClick = () => {
    navigate('/tailor/home/detail')
  }
  return (
    <div>
      <Alert variant='danger'>Complete Your Profile! Please Add Your Work and Pricing From Your Profile Menu Until Unless You Will Not Be Featured. </Alert>
      <label className={classes.label}>Welcome! {user?.name}</label>
      <DetailCard
        onClick={handleClick}
        className={classes.container}
        textClassName={classes.text}
        header='Tailor'
        text='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut ex suscipit, dapibus erat et, lobortis dui. Aenean nisl purus, finibus nec feugiat condimentum, suscipit sed metus. Mauris non vehicula odio. Duis ac quam sit amet dui elementum faucibus. Morbi non lacinia justo. Phasellus pharetra ex nec elit facilisis cursus. Phasellus laoreet placerat libero, nec venenatis velit consectetur nec. Vestibulum quis aliquet ex, at porttitor ipsum. Sed porttitor felis vitae eros lobortis, sit amet pulvinar orci mattis. Suspendisse dignissim tellus non scelerisque tincidunt. Integer a mauris non nisl condimentum facilisis. Morbi in enim sit amet purus dictum ultricies. Phasellus tristique in purus eu faucibus. Sed malesuada est eget sapien aliquet, vel sagittis ipsum elementum. Vestibulum et enim a lorem sodales laoreet. Cras ut aliquam purus. Donec non nisi sollicitudin, scelerisque augue nec, mollis nisi. Duis nec pharetra orci. '
        title='Mr John Ladies Tailor'
        ratingProps={{
          readOnly: false,
          defaultValue: 3
        }}
      />
      <DetailCard
        onClick={handleClick}
        className={classes.container}
        textClassName={classes.text}
        header='Tailor'
        text='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut ex suscipit, dapibus erat et, lobortis dui. Aenean nisl purus, finibus nec feugiat condimentum, suscipit sed metus. Mauris non vehicula odio. Duis ac quam sit amet dui elementum faucibus. Morbi non lacinia justo. Phasellus pharetra ex nec elit facilisis cursus. Phasellus laoreet placerat libero, nec venenatis velit consectetur nec. Vestibulum quis aliquet ex, at porttitor ipsum. Sed porttitor felis vitae eros lobortis, sit amet pulvinar orci mattis. Suspendisse dignissim tellus non scelerisque tincidunt. Integer a mauris non nisl condimentum facilisis. Morbi in enim sit amet purus dictum ultricies. Phasellus tristique in purus eu faucibus. Sed malesuada est eget sapien aliquet, vel sagittis ipsum elementum. Vestibulum et enim a lorem sodales laoreet. Cras ut aliquam purus. Donec non nisi sollicitudin, scelerisque augue nec, mollis nisi. Duis nec pharetra orci. '
        title='Mr John Ladies Tailor'
        ratingProps={{
          readOnly: false,
          defaultValue: 3
        }}
      />
      <DetailCard
        onClick={handleClick}
        className={classes.container}
        textClassName={classes.text}
        header='Tailor'
        text='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut ex suscipit, dapibus erat et, lobortis dui. Aenean nisl purus, finibus nec feugiat condimentum, suscipit sed metus. Mauris non vehicula odio. Duis ac quam sit amet dui elementum faucibus. Morbi non lacinia justo. Phasellus pharetra ex nec elit facilisis cursus. Phasellus laoreet placerat libero, nec venenatis velit consectetur nec. Vestibulum quis aliquet ex, at porttitor ipsum. Sed porttitor felis vitae eros lobortis, sit amet pulvinar orci mattis. Suspendisse dignissim tellus non scelerisque tincidunt. Integer a mauris non nisl condimentum facilisis. Morbi in enim sit amet purus dictum ultricies. Phasellus tristique in purus eu faucibus. Sed malesuada est eget sapien aliquet, vel sagittis ipsum elementum. Vestibulum et enim a lorem sodales laoreet. Cras ut aliquam purus. Donec non nisi sollicitudin, scelerisque augue nec, mollis nisi. Duis nec pharetra orci. '
        title='Mr John Ladies Tailor'
        ratingProps={{
          readOnly: false,
          defaultValue: 3
        }}
      />
    </div>
  )
}

export default HomeTaylor