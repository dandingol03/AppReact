import React from 'react';
import {render} from 'react-dom';
import TdElement from '../../components/forms/TdElement.jsx';
import '../../css/components/forms/embedTable/EmbedTable.css';
import HideElement from '../../components/basic/HideElement.jsx';



/**
 * EmbedTable,表格组件，请使用&lt;StackedTable /&gt;进行实例化
 * @author outstudio
 * @constructor EmbedTable
 * @example
 * <EmbedTable
 * title={title}
 * query={{
                url:"/gradms/bsuims/reactPageDataRequest.do",
                params:
                {
                    reactPageName:'cultivateTutorPage',
                    reactActionName:'getAllTutorListUseReact'
                }
            }}
 * subQuery={{
                url:"/gradms/bsuims/reactPageDataRequest.do",
                params:{
                    personId:'',
                    reactPageName:'cultivateTutorPage',
                    reactActionName:"personIntroductionShow"
                }
            }}
 * autoFetch={true}
 * />
 *
 *
 *
 *
 *
 *
 */
var EmbedTable=React.createClass({
    foldCb:function(formName){
        console.log();
        //$("form[name!='"+formName+"']").show();
        $("form[name='"+formName+"']").slideToggle();
        this.setState({personInfo:null});

    },
    clickCb:function(ob){
        var url=this.props.subQuery.url;
        if(url==undefined||url==null)
            return ;
        var params=this.props.subQuery.params;
        if(params==undefined||params==null)
            params=new Object();
        params.personId=parseInt(ob);
        this.queryHandle(url,params,null,function(response){
            if(response.data!==undefined&&response.data!==null)
            {
                response.data.title="个人简介";
                this.setState({personInfo:response.data});
                $("form[name='hideForm']").slideToggle();
                //$("form[name!='hideForm']").fadeToggle();

            }
        }.bind(this));
    },
    fetch:function(){

        this.queryHandle(this.props.query.url,this.props.query.params,null,function(response){
            var data;
            data=response;
            if(data!==undefined&&data!==null) {
                this.setProps({data: data, data$initialed: true})
            }
        }.bind(this));



    },
    queryHandle:function(url,params,dataType,callback){
        $.ajax({
            type: 'POST',
            url: url,
            dataType: dataType!==undefined&&dataType!==null?dataType:'json',
            data: params,
            cache: false,
            success: function(response) {
                if(callback!==undefined&&callback!==null)
                    callback(response);
            },
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }
        });
    },
    getInitialState:function(){
        //自动拉取服务器数据
        var autoFetch;
        if(this.props.autoFetch!==undefined&&this.props.autoFetch!==null)
            autoFetch=this.props.autoFetch;
        else
            autoFetch=false;

        //数据是否绑定
        var data$initialed;
        if(this.props.data!==undefined&&this.props.data!==null)
            data$initialed=true;
        else
            data$initialed=false;

        //指定嵌套表的列宽
        var embedCols;
        if(this.props.embedCols!==undefined&&this.props.embedCols!==null)
            embedCols=this.props.embedCols;
        else
            embedCols=10;

        //存储hideForm的数据,当组件位于二层内部时不能直接使用setProps


        return ({
            autoFetch:autoFetch,data$initialed:data$initialed,embedCols:embedCols
        })
    },
    componentWillReceiveProps:function(props)
    {
        //更新data$initialed状态
        if(props.data$initialed!==undefined&&props.data$initialed!==null)
            this.setState({data$initialed:props.data$initialed});
    },
    render:function(){
        //表格数据未绑定
        if(this.state.data$initialed!==true)
        {
            if(this.state.autoFetch==true)
                this.fetch();

            return (
                <table className="table table-bordered center">
            </table>
            )

        }else{
            //表格数据已绑定
            //不采用this.state.data的原因,state与props不同步

            var trs=null;
            if(this.props.data!==undefined&&this.props.data!==null)
            {
                trs=new Array();
                var embedCols=this.state.embedCols;
                var clickCb=this.clickCb;
                this.props.data.arr.map(function(item,i) {
                    var sub$data;
                    if(item.data!==undefined&&item.data!==null)
                        sub$data=item.data;
                    else
                        return false;
                    var sub$title;
                    if(item.title!==undefined&&item.title!==null)
                    {
                        sub$title=(<td rowSpan={1} style={{verticalAlign:"middle",textAlign:"center"}}>{item.title}</td>);
                    }
                    var rows=parseInt(sub$data.length/embedCols)+1;
                    var td$table;
                    var sub$trs=new Array();
                    var sub$tds;
                    var sub$row$index=0;
                    sub$data.map(function(sub,j) {
                        if(j%embedCols==0)
                        {
                            sub$tds=new Array();
                        }
                        sub$tds.push(
                                <TdElement key={j} data={sub.personId} clickCb={clickCb}>{sub.perName}</TdElement>
                        );
                        if(j%embedCols==(embedCols-1)||j==sub$data.length-1)
                        {
                            sub$trs.push(<tr key={sub$row$index}>{sub$tds}</tr>);
                            sub$row$index++;
                        }

                        });
                    td$table=(
                        <table className="table table-bordered center" key={i}>
                        <tbody>
                        {sub$trs}
                        </tbody>
                    </table>);


                    trs.push(
                        <tr key={i}>
                            {sub$title}
                            <td>{td$table}</td>
                        </tr>
                    )
                });

            }


            var hideTable;
            if(this.state.personInfo!==undefined&&this.state.personInfo!==null)
            {
                var personInfo=this.state.personInfo;
                hideTable= <HideElement personInfo={personInfo} foldCb={this.foldCb} name='hideForm' title="个人简介" dataField="email"/>
            }



            return (
                <div style={{marginLeft:"80px"}}>
                    <form name='hideForm' style={{margin:"20px",display:'none'}}>
                        <div className="row" >
                            <div className="col-sm-12">
                                {hideTable}
                            </div>
                        </div>
                    </form>
                    <form name="embedTableForm" className="form embedTable" method="post" style={{margin:"20px"}}>
                        <div className="row">
                            <div className="col-sm-12">
                                <table className="table table-bordered center">
                                    <thead>
                                    <tr>
                                        <th colSpan={2}>{this.props.title}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {trs}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </form>
                </div>
           )

        }


    }
});
export default EmbedTable;