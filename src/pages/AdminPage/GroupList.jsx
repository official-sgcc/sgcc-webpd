import "./GroupList.css";

const groups=[
    {
        id:1,
        name:'웹사이트 프로젝트',
        members:['정주원','김도현','김보상','김태성','민경태','이노을','최재원','이종훈','하서정'],
        
    },
    {
        id:2,
        name: 'C언어 스터디',
        members: ['정주원','김도현','김보상','김태성','민경태','이노을','최재원','이종훈','하서정'],

    },
    {
        id:3,
        name: '게임 개발 스터디',
        members: ['정주원','김도현','김보상','김태성','민경태','이노을','최재원','이종훈','하서정'],

    },
];
    
    


function GroupList() {
    return(
        <div className='group-list'>
           {groups.map((group)=>(
            <div className='group-card' key={group.id}>

                {/*위쪽 남색 영역*/}
                <div className='group-card-top'>
                 <h2 className='group-name'>{group.name}</h2>
                </div>

                {/*아래쪽 빨간 영역*/}
                <div className='group-card-bottom'>
                    {group.members.map((member,index)=>(
                        <span className='member-chip' key={index}>
                            {member}
                        </span>
                    ))}
                </div>        
            
            </div>
           ))} 
        </div>
    );
}

export default GroupList;
