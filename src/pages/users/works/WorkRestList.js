import { useEffect, useState } from 'react';
import WorkRestListCSS from './WorkRestList.module.css';
import { callLeavePostAPI, callLeaveYearAPI } from '../../../apis/LeaveAPICalls';
import { useDispatch, useSelector } from 'react-redux';
import DateSelect from '../../../components/Work/DateSelect';
import { callMyLeaveListAPI, callSelectMyLeaveListAPI } from '../../../apis/LeavePayAPICalls';
import { callWorkMyListAPI } from '../../../apis/WorkAPICalls';
import PagingBar from '../../../components/common/PagingBar';
import YearSelect from '../../../components/Work/YearSelect';

function WorkRestList() {
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();
    const { leave } = useSelector(state => state.leavePayReducer);
    const { lYear } = useSelector(state => state.leaveReducer);
    const [year2, setYear2] = useState(new Date().getFullYear());
    const [month2, setMonth2 ] = useState(new Date().getMonth() + 1);
    const pageInfo = leave && leave ? leave.data.pageInfo : null;
    const today = new Date();

    const formattedYear = formatYear(today);
    function formatYear(date) {
        const year = date.getFullYear();
        return `${year}`;
    }

    const formattedDate = formatDate(today);
    
    function formatDate(date) {
        const year = date.getFullYear();
    
        return `${year}`;
    }

    
    const handleYearChange = (bYear, year) => {
        setYear2(year);
        setCurrentPage(1);
    };
    
    
    useEffect(
        () => {
            dispatch(callLeavePostAPI({ year : formattedYear }));
        }, []
    )

    
    useEffect(() => {
        if (formattedDate) {
            
            dispatch(callWorkMyListAPI({ workDate: formattedDate, currentPage }));
            } 
            else {
            dispatch(callWorkMyListAPI({ workDate: formattedDate, currentPage }));
            }
    }, [formattedDate]);

    useEffect(
        ()=> {
                dispatch(callLeaveYearAPI({ year : formattedYear }))
        },
        [formattedYear]
    );

    useEffect(() => {
        
        if(year2) {
            if(month2 <10 ){
                const workDate = year2.toString()
                dispatch(callSelectMyLeaveListAPI({ workDate, currentPage }));
                dispatch(callLeaveYearAPI({ year : year2 }))
            } else {
                const workDate = year2.toString()
                dispatch(callSelectMyLeaveListAPI({ workDate, currentPage }));
                dispatch(callLeaveYearAPI({ year : year2 }))
            }
        }

    },[year2, month2, currentPage]);


    return(
        <>
            <div className={ WorkRestListCSS.main }>
                <p className={ WorkRestListCSS.p }>연차 내역</p>
                <div className={ WorkRestListCSS.btnContainer }>
                </div>
                <hr className={ WorkRestListCSS.hr }></hr>
                <div className={ WorkRestListCSS.btnContainer2 }>
                    <div className={ WorkRestListCSS.dateSelect }>
                        <YearSelect 

                        year2={year2}
                       
                        
                        onYearChange={handleYearChange}
                        
                        // onChageHandler={ onChageHandler }
                        
                        />
                    </div>
                        <table className={ WorkRestListCSS.space}>
                            <thead>
                                <tr className={ WorkRestListCSS.th2 }>
                                    <th className={ WorkRestListCSS.th2 }>총 연차</th>
                                    <th className={ WorkRestListCSS.th2 }>사용 일</th>
                                    <th className={ WorkRestListCSS.th2 }>남은 일</th>
                                </tr>
                            </thead>
                            <tbody>
                            {lYear && lYear.data && (
                                <tr className={WorkRestListCSS.td2}>
                                    <td className={WorkRestListCSS.td2}>{lYear.data.leaveTotalDay}</td>
                                    <td className={WorkRestListCSS.td2}>{lYear.data.leaveUseDay}</td>
                                    <td className={WorkRestListCSS.td2}>{lYear.data.leaveTotalDay - lYear.data.leaveUseDay}</td>
                                </tr>
                                )}
                            </tbody>
                        </table>
                </div>
                <hr className={ WorkRestListCSS.hr }></hr>
                <table className={ WorkRestListCSS.table }>
                    <thead>
                        <tr className={ WorkRestListCSS.th }>
                            <th>신청 일자</th>
                            <th>부서</th>
                            <th>직급</th>
                            <th>이름</th>
                            <th>연차 사유</th>
                            <th>연차 시작</th>
                            <th>연차 종료</th>
                            {/* <th>사용일</th> */}
                        </tr>
                    </thead>
                    <tbody>
                    {leave && leave.data && leave.data.data.map((leave, index) => (
                        <tr className={WorkRestListCSS.td} key={leave.leaveCode}>
                            <td>{leave.leaveReqDate.substring(0, 10)}</td>
                            <td>{lYear ? lYear.data.emp.dept.deptName : ""}</td>
                            <td>{lYear ? lYear.data.emp.job.jobName : ""}</td>
                            <td>{lYear ? lYear.data.emp.empName : ""}</td>
                            <td>{leave.leaveType}</td>
                            <td>{leave.leaveStartDay.substring(0, 10)}</td>
                            <td>{leave.leaveEndDate.substring(0, 10)}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
                <div>
                { pageInfo && <PagingBar pageInfo={ pageInfo } setCurrentPage={ setCurrentPage } /> }
                </div>
            </div>
        </>
    );
}

export default WorkRestList;
