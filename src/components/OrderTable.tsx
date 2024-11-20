import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Avatar,
    Box,
    Button,
    Chip,
    Divider,
    Input,
    IconButton,
    Link,
    Modal,
    ModalDialog,
    ModalClose,
    Sheet,
    Table,
    Typography,
    Checkbox,
    Menu,
    MenuButton,
    MenuItem,
    Dropdown,
} from "@mui/joy";
import {
    FilterAlt as FilterAltIcon,
    Search as SearchIcon,
    ArrowDropDown as ArrowDropDownIcon,
    CheckRounded as CheckRoundedIcon,
    AutorenewRounded as AutorenewRoundedIcon,
    Block as BlockIcon,
    KeyboardArrowLeft as KeyboardArrowLeftIcon,
    KeyboardArrowRight as KeyboardArrowRightIcon,
    MoreHorizRounded as MoreHorizRoundedIcon,
} from "@mui/icons-material";
import { ColorPaletteProp } from "@mui/joy/styles";

// Define types
type GenderStatus = "Paid" | "Refunded" | "Cancelled";
interface RowData {
    id: string;
    dob: { age: number };
    location: { country: string };
    gender: GenderStatus;
    name: { first: string };
    email: string;
    nat: string;
}

const GENDER_ICONS: Record<GenderStatus, JSX.Element> = {
    Paid: <CheckRoundedIcon />,
    Refunded: <AutorenewRoundedIcon />,
    Cancelled: <BlockIcon />,
};

const GENDER_COLORS: Record<GenderStatus, ColorPaletteProp> = {
    Paid: "success",
    Refunded: "neutral",
    Cancelled: "danger",
};

const RowMenu: React.FC = () => (
    <Dropdown>
        <MenuButton
            slots={{ root: IconButton }}
            slotProps={{
                root: { variant: "plain", color: "neutral", size: "sm" },
            }}
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

const OrderTable: React.FC = () => {
    const [order, setOrder] = useState<"asc" | "desc">("desc");
    const [selected, setSelected] = useState<readonly string[]>([]);
    const [open, setOpen] = useState(false);
    const [rows, setRows] = useState<RowData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const rowsPerPage = 15;

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                setError(null);
                const { data } = await axios.get(
                    "https://api.freeapi.app/api/v1/public/randomusers?page=1&limit=100"
                );
                setRows(data.data.data);
            } catch {
                setError("Failed to fetch orders.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const getComparator = (
        order: "asc" | "desc",
        orderBy: keyof RowData
    ) => (a: RowData, b: RowData) => {
        if (a[orderBy] < b[orderBy]) return order === "asc" ? -1 : 1;
        if (a[orderBy] > b[orderBy]) return order === "asc" ? 1 : -1;
        return 0;
    };

    const paginatedRows = rows.slice(
        (page - 1) * rowsPerPage,
        page * rowsPerPage
    );

    const toggleSelectAll = (checked: boolean) => {
        setSelected(checked ? rows.map((row) => row.id) : []);
    };

    const toggleSelectRow = (id: string, checked: boolean) => {
        setSelected((prev) =>
            checked ? [...prev, id] : prev.filter((selectedId) => selectedId !== id)
        );
    };

    if (loading) return <Typography>Loading orders...</Typography>;
    if (error) return <Typography>{error}</Typography>;

    return (
        <>
            {/* Search & Filter */}
            <Sheet sx={{ display: { xs: "flex", sm: "none" }, my: 1, gap: 1 }}>
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
                    <ModalDialog layout="fullscreen">
                        <ModalClose />
                        <Typography level="h2">Filters</Typography>
                        <Divider sx={{ my: 2 }} />
                        <Sheet sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            {/* Add filter controls */}
                            <Button color="primary" onClick={() => setOpen(false)}>
                                Apply
                            </Button>
                        </Sheet>
                    </ModalDialog>
                </Modal>
            </Sheet>

            {/* Table */}
            <Sheet variant="outlined" sx={{ width: "100%", borderRadius: "sm" }}>
                <Table stickyHeader hoverRow>
                    <thead>
                    <tr>
                        <th>
                            <Checkbox
                                size="sm"
                                indeterminate={
                                    selected.length > 0 && selected.length !== rows.length
                                }
                                checked={selected.length === rows.length}
                                onChange={(e) => toggleSelectAll(e.target.checked)}
                            />
                        </th>
                        <th>
                            <Link
                                underline="none"
                                color="primary"
                                component="button"
                                onClick={() => setOrder(order === "asc" ? "desc" : "asc")}
                                endDecorator={<ArrowDropDownIcon />}
                            >
                                Age
                            </Link>
                        </th>
                        <th>Country</th>
                        <th>Gender</th>
                        <th>Customer</th>
                        <th />
                    </tr>
                    </thead>
                    <tbody>
                    {paginatedRows
                        .sort(getComparator(order, "dob"))
                        .map((row) => (
                            <tr key={row.id}>
                                <td>
                                    <Checkbox
                                        size="sm"
                                        checked={selected.includes(row.id)}
                                        onChange={(e) =>
                                            toggleSelectRow(row.id, e.target.checked)
                                        }
                                    />
                                </td>
                                <td>{row.dob.age}</td>
                                <td>{row.location.country}</td>
                                <td>
                                    <Chip
                                        variant="soft"
                                        size="sm"
                                        startDecorator={GENDER_ICONS[row.gender]}
                                        color={GENDER_COLORS[row.gender]}
                                    >
                                        {row.gender}
                                    </Chip>
                                </td>
                                <td>
                                    <Box sx={{ display: "flex", gap: 2 }}>
                                        <Avatar size="sm">{row.nat}</Avatar>
                                        <div>
                                            <Typography>{row.name.first}</Typography>
                                            <Typography>{row.email}</Typography>
                                        </div>
                                    </Box>
                                </td>
                                <td>
                                    <RowMenu />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Sheet>

            {/* Pagination */}
            <Box sx={{ pt: 2, display: "flex", justifyContent: "space-between" }}>
                <Button
                    size="sm"
                    variant="outlined"
                    startDecorator={<KeyboardArrowLeftIcon />}
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                >
                    Previous
                </Button>
                {Array.from({ length: Math.ceil(rows.length / rowsPerPage) }).map(
                    (_, idx) => (
                        <IconButton
                            key={idx + 1}
                            size="sm"
                            variant={page === idx + 1 ? "solid" : "outlined"}
                            onClick={() => setPage(idx + 1)}
                        >
                            {idx + 1}
                        </IconButton>
                    )
                )}
                <Button
                    size="sm"
                    variant="outlined"
                    endDecorator={<KeyboardArrowRightIcon />}
                    onClick={() =>
                        setPage((prev) => Math.min(prev + 1, Math.ceil(rows.length / rowsPerPage)))
                    }
                    disabled={page === Math.ceil(rows.length / rowsPerPage)}
                >
                    Next
                </Button>
            </Box>
        </>
    );
};

export default OrderTable;