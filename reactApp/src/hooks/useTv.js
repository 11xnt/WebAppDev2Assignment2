import { useEffect, useState } from "react";
import {getTvShow} from '../api/tmdb-api'

const useTv = id => {
    const [tv, setTv] = useState(null);
    useEffect(() => {
        getTvShow(id).then(tv => {
            setTv(tv);
        });
    }, [id]);
    return [tv, setTv];
};

export default useTv