import React from "react";
import { FormBtn } from "../Form";
import "./Article.css";

const Article = props => {
    return (
        <div className='col-lg-4 col-md-6 col-12 my-2'>
            <div className=" pl-2 mx-2 bg-light addRad">

                <div className="row">

                    {/* Headline Title */}
                    <h6 className="col-9 form-group">
                        <a href={props.web_url}>{props.headline ? props.headline : "NYT Link"}</a>
                    </h6>

                    <FormBtn
                        id={props.id}
                        onClick={props.saveArticle}
                    >
                        {props.btnText}
                    </FormBtn>

                </div>

                <div className="row niceFont">

                    {/* Byline Section */}
                    <div className="col-md-4 col-12">
                        {props.byline}
                    </div>

                    {/* Article Section */}
                    <div className="col-md-4 col-12">
                        {props.section_name ? "Section: " + props.section_name : ""}
                    </div>

                    {/* Pubdate Section */}
                    <div className="col-md-4 col-12">
                        {props.pub_date ? "published: " + props.pub_date.substring(0, 10) : ""}
                    </div>

                </div>
            </div>

        </div>);
};

export default Article;