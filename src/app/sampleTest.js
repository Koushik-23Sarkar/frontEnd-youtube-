[  //After aggregate pipeline returns Array.
        {
            $match: {   //find method   
                username: username?.toLowerCase()
            }   // now we have user field which match the above value
        },
        {
            $lookup: {      //use for join method (basically to join two tables)
                from: "subscriptions",  //which table you want to join 
                localField: "_id",  // name of the local field which is connected with the forignField
                foreignField: "channel",    // name of the forignField which is connected with the localfield
                as: "subscribers"   // name of the result of the oparetion //result will be stored as "subscribers" field.
            }   // we join "subscriptions" table with "user" table.
        },
        {
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "subscriber",
                as: "subscribedTo"
            }
        },
        {
            $addFields: {   // to add new fields in the table
                subscribersCount: {
                    $size: "$subscribers" //calculation for this field
                },
                channelsSubscribedToCount: {
                    $size: "$subscribedTo"
                },
                isSubscribed: {
                    $cond: {
                        if: {$in: [req.user?._id, "$subscribers.subscriber"]},  // is "req.user?._id" present in the "$subscribers.subscriber" or not
                        then: true,
                        else: false
                    }
                }
            }
        },
        {
            $project: {     // you may have so many field, $project will return only the selected field.
                fullName: 1,
                username: 1,
                subscribersCount: 1,
                channelsSubscribedToCount: 1,
                isSubscribed: 1,
                avatar: 1,
                coverImage: 1,
                email: 1

            }
        }
    ]