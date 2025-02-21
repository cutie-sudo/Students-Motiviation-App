import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Student = () => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Student Dashboard</h1>
            
            {/* Recommended Content Section */}
            <Card>
                <CardContent>
                    <h2 className="text-xl mb-2">Recommended Content</h2>
                    <div className="grid grid-cols-3 gap-4">
                        
                        {/* Content Card 1 */}
                        <div className="card bg-base-100 shadow-md">
                            <div className="card-body">
                                <h3 className="card-title">Tech Journey</h3>
                                <p>Learn from industry experts.</p>
                                <Button className="btn btn-outline">Watch Now</Button>
                            </div>
                        </div>
                        
                        {/* Content Card 2 */}
                        <div className="card bg-base-100 shadow-md">
                            <div className="card-body">
                                <h3 className="card-title">DevOps Guide</h3>
                                <p>A complete guide to DevOps.</p>
                                <Button className="btn btn-outline">Read Article</Button>
                            </div>
                        </div>
                        
                        {/* Content Card 3 */}
                        <div className="card bg-base-100 shadow-md">
                            <div className="card-body">
                                <h3 className="card-title">Frontend Tips</h3>
                                <p>Best practices for frontend developers.</p>
                                <Button className="btn btn-outline">Listen Podcast</Button>
                            </div>
                        </div>

                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Student;
