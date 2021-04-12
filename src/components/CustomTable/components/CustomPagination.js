import { TablePagination } from "@material-ui/core";

import './custom_pagination.scss'

function CustomPagination({ page = 1, perPage = 10, totalCount = 10, handleChangePage, handleChangePerPage }) {

    // Pages start from 0

    const actualPage = page - 1;

    return (
        <TablePagination
            component="div"
            count={totalCount}
            rowsPerPageOptions={[1, 5, 10, 25]}
            page={actualPage}
            onChangePage={(e, page) => handleChangePage(page + 1)}
            rowsPerPage={perPage}
            onChangeRowsPerPage={(event, element) => handleChangePerPage(element.props.value)}
        />
    );
}

export default CustomPagination;