import React, {Component} from 'react';
export class Signup extends React.Component {
  render() {
    console.log("Rendering <Signup/>");

    return (
      <div className="col-md-4 col-md-offset-7">
            <div className="panel panel-default">
                <div className="panel-heading">
                    <span className="glyphicon glyphicon-lock"></span> Sign Up</div>
                <div className="panel-body">
                    <form className="form-horizontal" role="form">
                    <div className="form-group">
                        <label htmlFor="inputEmail3" className="col-sm-3 control-label">
                            Email</label>
                        <div className="col-sm-9">
                            <input type="email" className="form-control" id="inputEmail3" placeholder="Email" required/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputPassword3" className="col-sm-3 control-label">
                            Password</label>
                        <div className="col-sm-9">
                            <input type="password" className="form-control" id="inputPassword3" placeholder="Password" required/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputPassword4" className="col-sm-3 control-label">
                            Re-enter Password</label>
                        <div className="col-sm-9">
                            <input type="password" className="form-control" id="inputPassword4" placeholder="Password" required/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-3 col-sm-9">
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox"/>
                                    Remember me
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="form-group last">
                        <div className="col-sm-offset-3 col-sm-9">
                            <button type="submit" className="btn btn-success btn-sm">
                                Sign Up</button>
                                 <button type="reset" className="btn btn-default btn-sm">
                                Reset</button>
                        </div>
                    </div>
                    </form>
                </div>
                <div className="panel-footer">
                </div>
            </div>
        </div>
    );
  }
}