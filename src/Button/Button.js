// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import withStyles from '../styles/withStyles';
import { fade } from '../styles/colorManipulator';
import ButtonBase from '../internal/ButtonBase';

export const styleSheet = createStyleSheet('MuiButton', theme => ({
  root: {
    fontSize: theme.typography.fontSize,
    fontWeight: theme.typography.fontWeightMedium,
    fontFamily: theme.typography.fontFamily,
    lineHeight: '1em',
    textTransform: 'uppercase',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    minWidth: 88,
    minHeight: 36,
    padding: `11px ${theme.spacing.unit * 2}px`,
    borderRadius: 2,
    color: theme.palette.text.primary,
    backgroundColor: 'transparent',
    transition: theme.transitions.create(['background-color', 'box-shadow'], {
      duration: theme.transitions.duration.short,
    }),
    '&:hover': {
      textDecoration: 'none',
      backgroundColor: fade(theme.palette.text.primary, 0.12),
      '&$disabled': {
        backgroundColor: 'transparent',
      },
    },
  },
  dense: {
    padding: `10px ${theme.spacing.unit}px`,
    minWidth: 64,
    minHeight: 32,
    fontSize: theme.typography.fontSize - 1,
  },
  label: {
    width: '100%',
    display: 'inherit',
    alignItems: 'inherit',
    justifyContent: 'inherit',
  },
  flatPrimary: {
    color: theme.palette.primary[500],
    '&:hover': {
      backgroundColor: fade(theme.palette.primary[500], 0.12),
    },
  },
  flatAccent: {
    color: theme.palette.accent.A200,
    '&:hover': {
      backgroundColor: fade(theme.palette.accent.A200, 0.12),
    },
  },
  flatContrast: {
    color: theme.palette.getContrastText(theme.palette.primary[500]),
    '&:hover': {
      backgroundColor: fade(theme.palette.getContrastText(theme.palette.primary[500]), 0.12),
    },
  },
  colorInherit: {
    color: 'inherit',
  },
  raised: {
    color: theme.palette.getContrastText(theme.palette.grey[300]),
    backgroundColor: theme.palette.grey[300],
    boxShadow: theme.shadows[2],
    '&$keyboardFocused': {
      boxShadow: theme.shadows[6],
    },
    '&:active': {
      boxShadow: theme.shadows[8],
    },
    '&$disabled': {
      boxShadow: theme.shadows[0],
      backgroundColor: theme.palette.text.divider,
    },
    '&:hover': {
      backgroundColor: theme.palette.grey.A100,
      '&$disabled': {
        backgroundColor: theme.palette.text.divider,
      },
    },
  },
  keyboardFocused: {},
  raisedPrimary: {
    color: theme.palette.getContrastText(theme.palette.primary[500]),
    backgroundColor: theme.palette.primary[500],
    '&:hover': {
      backgroundColor: theme.palette.primary[700],
    },
  },
  raisedAccent: {
    color: theme.palette.getContrastText(theme.palette.accent.A200),
    backgroundColor: theme.palette.accent.A200,
    '&:hover': {
      backgroundColor: theme.palette.accent.A400,
    },
  },
  raisedContrast: {
    color: theme.palette.getContrastText(theme.palette.primary[500]),
  },
  disabled: {
    color: theme.palette.action.disabled,
  },
  fab: {
    borderRadius: '50%',
    padding: 0,
    minWidth: 0,
    width: 56,
    height: 56,
    boxShadow: theme.shadows[6],
    '&:active': {
      boxShadow: theme.shadows[12],
    },
  },
}));

function Button(props) {
  const {
    children,
    classes,
    className: classNameProp,
    color,
    dense,
    disabled,
    disableFocusRipple,
    fab,
    raised,
    ...other
  } = props;

  const flat = !raised && !fab;
  const className = classNames(
    {
      [classes.root]: true,
      [classes.raised]: raised || fab,
      [classes.fab]: fab,
      [classes.colorInherit]: color === 'inherit',
      [classes.flatPrimary]: flat && color === 'primary',
      [classes.flatAccent]: flat && color === 'accent',
      [classes.flatContrast]: flat && color === 'contrast',
      [classes.raisedPrimary]: !flat && color === 'primary',
      [classes.raisedAccent]: !flat && color === 'accent',
      [classes.raisedContrast]: !flat && color === 'contrast',
      [classes.dense]: dense,
      [classes.disabled]: disabled,
    },
    classNameProp,
  );

  return (
    <ButtonBase
      className={className}
      disabled={disabled}
      focusRipple={!disableFocusRipple}
      keyboardFocusedClassName={classes.keyboardFocused}
      {...other}
    >
      <span className={classes.label}>
        {children}
      </span>
    </ButtonBase>
  );
}

Button.propTypes = {
  /**
   * The content of the button.
   */
  children: PropTypes.node.isRequired,
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component. It's using the theme palette when that makes sense.
   */
  color: PropTypes.oneOf(['default', 'inherit', 'primary', 'accent', 'contrast']),
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   * The default value is a `button`.
   */
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  /**
   * Uses a smaller minWidth, ideal for things like card actions.
   */
  dense: PropTypes.bool,
  /**
   * If `true`, the button will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the  keyboard focus ripple will be disabled.
   * `ripple` must also be true.
   */
  disableFocusRipple: PropTypes.bool,
  /**
   * If `true`, the ripple effect will be disabled.
   */
  disableRipple: PropTypes.bool,
  /**
   * If `true`, well use floating action button styling.
   */
  fab: PropTypes.bool,
  /**
   * The URL to link to when the button is clicked.
   * If defined, an `a` element will be used as the root node.
   */
  href: PropTypes.string,
  /**
   * If `true`, the button will use raised styling.
   */
  raised: PropTypes.bool,
  /**
   * @ignore
   */
  type: PropTypes.string,
};

Button.defaultProps = {
  color: 'default',
  dense: false,
  disabled: false,
  fab: false,
  disableFocusRipple: false,
  raised: false,
  disableRipple: false,
  type: 'button',
};

export default withStyles(styleSheet)(Button);