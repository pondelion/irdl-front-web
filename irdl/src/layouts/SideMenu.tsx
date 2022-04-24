import { Divider } from '@mui/material';
import React from 'react';
import { bubble as BubbleMenu, push as PushMenu, pushRotate as PushRotateMenu } from 'react-burger-menu';
import { Link } from 'react-router-dom';


interface State {
  isOpen: boolean;
}

interface Styles {
  bmBurgerBars: Partial<CSSStyleDeclaration>;
  bmBurgerBarsHover: Partial<CSSStyleDeclaration>;
  bmBurgerButton: Partial<CSSStyleDeclaration>;
  bmCross: Partial<CSSStyleDeclaration>;
  bmCrossButton: Partial<CSSStyleDeclaration>;
  bmItemList: Partial<CSSStyleDeclaration>;
  bmItem: Partial<CSSStyleDeclaration>;
  bmMenuWrap: Partial<CSSStyleDeclaration>;
  bmMenu: Partial<CSSStyleDeclaration>;
  bmMorphShape: Partial<CSSStyleDeclaration>;
  bmOverlay: Partial<CSSStyleDeclaration>;
}

interface Props {
  bodyClassName?: string;
  burgerBarClassName?: string;
  burgerButtonClassName?: string;
  className?: string;
  crossButtonClassName?: string;
  crossClassName?: string;
  customBurgerIcon?: JSX.Element | false;
  customCrossIcon?: JSX.Element | false;
  customOnKeyDown?(event: React.KeyboardEvent): void;
  disableAutoFocus?: boolean;
  disableCloseOnEsc?: boolean;
  disableOverlayClick?: boolean;
  htmlClassName?: string;
  id?: string;
  isOpen?: boolean;
  itemClassName?: string;
  itemListClassName?: string;
  menuClassName?: string;
  morphShapeClassName?: string;
  noOverlay?: boolean;
  onStateChange?(state: State): void;
  // TODO (Rajab) This can be improved, though I do not know how. From PropTypes:
  // styles && styles.outerContainer ? PropTypes.string.isRequired : PropTypes.string
  outerContainerId?: string;
  overlayClassName?: string;
  // TODO (Rajab) This can be improved, though I do not know how. From PropTypes:
  // styles && styles.pageWrap ? PropTypes.string.isRequired : PropTypes.string,
  pageWrapId?: string;
  right?: boolean;
  styles?: Styles;
  width?: number | string;
}

const styles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '36px',
    height: '30px',
    left: '36px',
    top: '20px'
  },
  bmBurgerBars: {
    // background: '#373a47'
    background: '#DDDDDD'
  },
  bmBurgerBarsHover: {
    background: '#a90000'
  },
  bmCrossButton: {
    height: '24px',
    width: '24px'
  },
  bmCross: {
    background: '#bdc3c7'
  },
  bmMenuWrap: {
    position: 'fixed',
    top: '0px',
    height: '100%'
  },
  bmMenu: {
    background: '#373a47',
    padding: '0.5em 1.2em 0',
    overflowY: 'hidden',
    fontSize: '1.2em'
  },
  bmMorphShape: {
    fill: '#373a47'
  },
  bmItemList: {
    color: '#b8b7ad',
    padding: '0.8em'
  },
  bmItem: {
    display: 'inline-block',
    padding: '0.6em',
    color: '#fffce1',
    outline: 'none'
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)'
  }
}


const SideMenu: React.FC<Props> = (props: Props) => {

  const onStateChange = () => {}

  return (
    <div className="App">
      <PushRotateMenu
        styles={styles}
        onStateChange={onStateChange}
      >
        {/* <a id="home" className="menu-item" href="/">Home</a>
        <a id="dash_board" className="menu-item" href="/dashboard">Dash Board</a>
        <a id="remote_control" className="menu-item" href="/remote_control">Remote Device Control</a> */}
        <Link to={"/"} style={{ color: 'inherit',}}>Home</Link>
        <Link to={"/dashboard"} style={{ color: 'inherit',}}>Dash Board</Link>
        <Link to={"/remote_control"} style={{ color: 'inherit',}}>Remote Device Control</Link>
      </PushRotateMenu>
    </div>
  )

}

export default SideMenu;
