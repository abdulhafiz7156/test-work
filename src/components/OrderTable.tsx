import * as React from 'react';
import axios from 'axios';
import { ColorPaletteProp } from '@mui/joy/styles';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalClose from '@mui/joy/ModalClose';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import Checkbox from '@mui/joy/Checkbox';
import IconButton, { iconButtonClasses } from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';

import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import BlockIcon from '@mui/icons-material/Block';
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';

const RowMenu = () => {
    return (
        <Dropdown>
            <MenuButton
                slots={{ root: IconButton }}
                slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
            >
                <MoreHorizRoundedIcon />
            </MenuButton>
            <Menu size="sm" sx={{ minWidth: 140 }}>
                <MenuItem>Edit</MenuItem>
                <MenuItem>Rename</MenuItem>
                <MenuItem>Move</MenuItem>
                <Divider />
                <MenuItem color="danger">Delete</MenuItem>
            </Menu>
        </Dropdown>
    );
};

export default function OrderTable() {
    const [order, setOrder] = React.useState<'asc' | 'desc'>('desc');
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const [open, setOpen] = React.useState(false);
    const [rows, setRows] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    const [page, setPage] = React.useState(1);  // Current page
    const rowsPerPage = 15;  // Number of rows per page

    const getComparator = (order: 'asc' | 'desc', orderBy: string) => {
        return (a: any, b: any) => {
            if (a[orderBy] < b[orderBy]) {
                return order === 'asc' ? -1 : 1;
            }
            if (a[orderBy] > b[orderBy]) {
                return order === 'asc' ? 1 : -1;
            }
            return 0;
        };
    };

    // Fetch data using Axios
    React.useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await axios.get('https://api.freeapi.app/api/v1/public/randomusers?page=1&limit=100');  // Example API
                setRows(response.data.data.data);
            } catch (err) {
                setError('Failed to fetch orders');
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const handleChangePage = (newPage: number) => {
        setPage(newPage);
    };

    const paginatedRows = rows.slice((page - 1) * rowsPerPage, page * rowsPerPage);

    const renderFilters = () => (
        <React.Fragment>
            {/* Filter Controls */}
        </React.Fragment>
    );

    if (loading) {
        return <Typography>Loading orders...</Typography>;
    }

    if (error) {
        return <Typography>{error}</Typography>;
    }

    return (
        <React.Fragment>
            {/* Search & Filter */}
            <Sheet sx={{ display: { xs: 'flex', sm: 'none' }, my: 1, gap: 1 }}>
                <Input
                    size="sm"
                    placeholder="Search"
                    startDecorator={<SearchIcon />}
                    sx={{ flexGrow: 1 }}
                />
                <IconButton
                    size="sm"
                    variant="outlined"
                    color="neutral"
                    onClick={() => setOpen(true)}
                >
                    <FilterAltIcon />
                </IconButton>
                <Modal open={open} onClose={() => setOpen(false)}>
                    <ModalDialog aria-labelledby="filter-modal" layout="fullscreen">
                        <ModalClose />
                        <Typography id="filter-modal" level="h2">
                            Filters
                        </Typography>
                        <Divider sx={{ my: 2 }} />
                        <Sheet sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {renderFilters()}
                            <Button color="primary" onClick={() => setOpen(false)}>
                                Submit
                            </Button>
                        </Sheet>
                    </ModalDialog>
                </Modal>
            </Sheet>

            {/* Table */}
            <Sheet
                variant="outlined"
                sx={{
                    width: '100%',
                    borderRadius: 'sm',
                    overflow: 'auto',
                    minHeight: 0,
                }}
            >
                <Table stickyHeader hoverRow>
                    <thead>
                    <tr>
                        <th style={{ width: 48, textAlign: 'center', padding: '12px 6px' }}>
                            <Checkbox
                                size="sm"
                                indeterminate={
                                    selected.length > 0 && selected.length !== rows.length
                                }
                                checked={selected.length === rows.length}
                                onChange={(event) => {
                                    setSelected(
                                        event.target.checked ? rows.map((row) => row.id) : [],
                                    );
                                }}
                                color={
                                    selected.length > 0 || selected.length === rows.length
                                        ? 'primary'
                                        : undefined
                                }
                                sx={{ verticalAlign: 'text-bottom' }}
                            />
                        </th>
                        <th style={{ width: 120, padding: '12px 6px' }}>
                            <Link
                                underline="none"
                                color="primary"
                                component="button"
                                onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}
                                endDecorator={<ArrowDropDownIcon />}
                                sx={[
                                    {
                                        fontWeight: 'lg',
                                        '& svg': {
                                            transition: '0.2s',
                                            transform:
                                                order === 'desc' ? 'rotate(0deg)' : 'rotate(180deg)',
                                        },
                                    },
                                    order === 'desc'
                                        ? { '& svg': { transform: 'rotate(0deg)' } }
                                        : { '& svg': { transform: 'rotate(180deg)' } },
                                ]}
                            >
                                Age
                            </Link>
                        </th>
                        <th style={{ width: 140, padding: '12px 6px' }}>Country</th>
                        <th style={{ width: 140, padding: '12px 6px' }}>Gender</th>
                        <th style={{ width: 240, padding: '12px 6px' }}>Customer</th>
                        <th style={{ width: 140, padding: '12px 6px' }}> </th>
                    </tr>
                    </thead>
                    <tbody>
                    {[...paginatedRows].sort(getComparator(order, 'id')).map((row) => (
                        <tr key={row.id}>
                            <td style={{ textAlign: 'center', width: 120 }}>
                                <Checkbox
                                    size="sm"
                                    checked={selected.includes(row.id)}
                                    color={selected.includes(row.id) ? 'primary' : undefined}
                                    onChange={(event) => {
                                        setSelected((ids) =>
                                            event.target.checked
                                                ? ids.concat(row.id)
                                                : ids.filter((itemId) => itemId !== row.id),
                                        );
                                    }}
                                    slotProps={{ checkbox: { sx: { textAlign: 'left' } } }}
                                    sx={{ verticalAlign: 'text-bottom' }}
                                />
                            </td>
                            <td>
                                <Typography level="body-xs">{row.dob.age}</Typography>
                            </td>
                            <td>
                                <Typography level="body-xs">{row.location.country}</Typography>
                            </td>
                            <td>
                                <Chip
                                    variant="soft"
                                    size="sm"
                                    startDecorator={
                                        {
                                            Paid: <CheckRoundedIcon />,
                                            Refunded: <AutorenewRoundedIcon />,
                                            Cancelled: <BlockIcon />,
                                        }[row.gender]
                                    }
                                    color={
                                        {
                                            Paid: 'success',
                                            Refunded: 'neutral',
                                            Cancelled: 'danger',
                                        }[row.gender] as ColorPaletteProp
                                    }
                                >
                                    {row.gender}
                                </Chip>
                            </td>
                            <td>
                                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                    <Avatar size="sm">{row.nat}</Avatar>
                                    <div>
                                        <Typography level="body-xs">{row.name.first}</Typography>
                                        <Typography level="body-xs">{row.email}</Typography>
                                    </div>
                                </Box>
                            </td>
                            <td>
                                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                    <Link level="body-xs" component="button">
                                        Download
                                    </Link>
                                    <RowMenu />
                                </Box>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </Sheet>

            {/* Pagination */}
            <Box
                sx={{
                    pt: 2,
                    gap: 1,
                    display: 'flex',
                }}
            >
                <Button
                    size="sm"
                    variant="outlined"
                    color="neutral"
                    startDecorator={<KeyboardArrowLeftIcon />}
                    onClick={() => handleChangePage(page - 1)}
                    disabled={page === 1}
                >
                    Previous
                </Button>

                <Box sx={{ flex: 1 }} />
                {Array.from({ length: Math.ceil(rows.length / rowsPerPage) }, (_, idx) => (
                    <IconButton
                        key={idx + 1}
                        size="sm"
                        variant={page === idx + 1 ? 'contained' : 'outlined'}
                        color="neutral"
                        onClick={() => handleChangePage(idx + 1)}
                    >
                        {idx + 1}
                    </IconButton>
                ))}
                <Box sx={{ flex: 1 }} />
                <Button
                    size="sm"
                    variant="outlined"
                    color="neutral"
                    endDecorator={<KeyboardArrowRightIcon />}
                    onClick={() => handleChangePage(page + 1)}
                    disabled={page === Math.ceil(rows.length / rowsPerPage)}
                >
                    Next
                </Button>
            </Box>
        </React.Fragment>
    );
}
