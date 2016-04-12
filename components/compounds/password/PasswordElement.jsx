import React from 'react';
import {render} from 'react-dom';

/**
 * Bootstrap
 */
var PasswordElement=React.createClass({
    commitCb:function(evt){
        //do validate job
        var valueBinding=this.state.valueBinding;
        if(valueBinding["enterOldPwd"]!==valueBinding["enterRepeatPwd"])
        {
            alert("两次输入的密码有误,请重新输入");
            return;
        }
        var form=document.getElementsByName("passwordForm")[0];
        form.submit();
    },
    handleChange:function(evt){
        var value=evt.target.value;
        var name=evt.target.name;
        alert("name="+name);
        var valueBinding=this.state.valueBinding;
        valueBinding[name]=value;
        this.setState({valueBinding});
    },
    getInitialState:function() {
        //twSpan,代表通过计算获得的表宽,不设置即为2
        var twSpan;
        if(this.props.twSpan!==undefined&&this.props.twSpan!==null)
            twSpan=this.props.twSpan;
        else
            twSpan=2;

        var valueBinding=new Object();
        return ({twSpan:twSpan,valueBinding:valueBinding})
    }
    ,
    render:function(){



        //表头标题
        var title;
        if(this.props.title!==undefined&&this.propts.title!==null)
        {
            title=(<tr><td colSpan={this.state.twSpan}>{this.props.title}</td></tr>);
        }



        var inputFields;
        var tdStyle_f={width:"40%"};
        var tdStyle_b={width:"50%"};
        var content;
        inputFields=new Array();
        if(this.props.inputFields!==undefined&&this.props.inputFields!==null)
        {
            content=this.props.inputFields;
        }else {
             content=[
                {
                field:"旧密码:",name:"enterOldPwd"
                },
                {
                    field:"输入新密码:",name:"enterRepeatNewPwd",contract:"密码长度最大为12位"
                },
                {
                    field:"重复输入新密码:",name:"enterRepeatNewPwd",contract:"密码长度最大为12位"
                }];
        }
        //遍历inputFields,拿到所需填写的字段和填写该字段所需满足的规则
        var handleChange=this.handleChange;
        content.map(function(item,i) {


            inputFields.push(
                <tr key={i}>
                    <td style={tdStyle_f}>{item.field}</td>
                    <td style={tdStyle_b}>
                        <input type="password" name={item.name} onChange={handleChange}/>
                    </td>
                    <span>{item.contract}</span>
                </tr>
            )
        });
        //buttons
        var buttons;
        buttons=(<tr><td colSpan={this.state.twSpan}>
            <button className="btn btn-default" value="提交" onClick={this.commitCb}></button>
            <button className="btn btn-default" value="重置" type="reset"></button>
        </td></tr>)
    return (
    <form name="passwordForm" method="post" action={this.props.action}>
        <div className="row">
            <div className="col-lg-10">
                    <table className="table table-bordered center">
                        <thead>
                        {title}
                        </thead>
                        <tbody>
                        {inputFields}
                        {buttons}
                        </tbody>
                    </table>
            </div>
        </div>
    </form>
    )
    }
})