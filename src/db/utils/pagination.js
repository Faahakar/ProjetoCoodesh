module.exports = () => {



    const getOffset = (page, limit) => {
        return (page * limit) - limit;
    }

    const getNextPage = (page, limit, total) => {
        if ((total / limit) > page) {
            return page + 1;
        }

        return null
    }
    const getPageCount = (limit,total) =>{
        const pageCount = parseInt(total/limit);
        return pageCount;
    }

    const getPreviousPage = (page) => {
        if (page <= 1) {
            return null
        }
        return page - 1;
    }
    return Object.create({getOffset,getNextPage,getPreviousPage,getPageCount})

}