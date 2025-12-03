exports.returnD = (data, msg) => {
    return {
        status: data ? 'ok' : 'fail',
        data,
        msg
    }
}

