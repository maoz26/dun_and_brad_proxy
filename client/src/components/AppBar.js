import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { alpha, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Drawer from "@material-ui/core/Drawer";
import {
    Button,
    Divider,
    List,
    ListItem,
    ListItemText
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchBtn: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.75),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.85),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
}));

const SearchAppBar = (props) => {
    const {
        searchField,
        onSearchField,
        onSearchBlur,
        pastQueries,
        onPastQueryClicked
    } = props;

    const [drawerState, setDrawerState] = useState(false);

    const classes = useStyles();

    const toggleDrawer = (event, isOpen) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;
        setDrawerState(isOpen);
    };

    const onMenuClicked = (e) => {
        toggleDrawer(e,true);
    }

    const onPastQueryTriggered = (e, text) => {
        onPastQueryClicked(e, text);
        toggleDrawer(e, false);
    }

    return <div className={classes.root}>
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="open drawer"
                    onClick={onMenuClicked}
                >
                    <MenuIcon/>
                </IconButton>
                <Typography className={classes.title} variant="h6" noWrap>Dun & Bradstreet Proxy</Typography>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        placeholder="Search…"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                        value={searchField}
                        onInput={onSearchField}
                        onBlur={onSearchBlur}
                    />
                </div>
                <div className={classes.searchBtn}>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={onSearchBlur}
                    >{'find!'}</Button>
                </div>
            </Toolbar>
        </AppBar>
        <Drawer
            open={drawerState}
            onClose={(e) => toggleDrawer(e, false)}
        >
            <div role="presentation">
                <h3>Last queries</h3>
                <Divider/>
                <List>
                    {pastQueries.map((text, index) => (
                        <ListItem button key={text} onClick={(e) => onPastQueryTriggered(e, text)}>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </div>
        </Drawer>
    </div>;
}

export default SearchAppBar;
