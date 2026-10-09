let cart = [];

function bookRoom(roomName) {

    const date = document.getElementById("roomDate").value;
    const time = document.getElementById("roomTime").value;

    if (date === "" || time === "") {
        alert("Please select a date and time first.");
        return;
    }

    const booking = {
        type: "booking",
        name: roomName,
        details: "Classroom booking",
        date: date,
        time: time
    };

    saveActivity(booking);

    alert(
        roomName +
        " has been booked successfully.\n\n" +
        "Date: " + date +
        "\nTime: " + time
    );
}


function addToCart(itemName, price) {

    const existingItem = cart.find(
        item => item.name === itemName
    );

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            name: itemName,
            price: price,
            quantity: 1
        });
    }

    showCart();
}


function showCart() {

    const cartItems =
        document.getElementById("cartItems");

    const cartTotal =
        document.getElementById("cartTotal");

    if (!cartItems) {
        return;
    }

    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {

        cartItems.innerHTML =
            '<p class="empty-cart">Your cart is empty.</p>';

    }

    cart.forEach(item => {

        const itemTotal =
            item.price * item.quantity;

        total += itemTotal;

        cartItems.innerHTML += `
            <div class="cart-item">
                <span>
                    ${item.name} × ${item.quantity}
                </span>

                <strong>
                    ₹${itemTotal}
                </strong>
            </div>
        `;
    });

    cartTotal.textContent = total;
}


function placeOrder() {

    if (cart.length === 0) {

        alert(
            "Please add something to your cart first."
        );

        return;
    }

    const orderNumber =
        Math.floor(1000 + Math.random() * 9000);

    let total = 0;

    cart.forEach(item => {

        total +=
            item.price * item.quantity;
    });

    const order = {

        type: "order",

        name:
            "Canteen Order #" + orderNumber,

        details:
            "Food order",

        total:
            total,

        status:
            "Preparing"
    };

    saveActivity(order);

    alert(
        "Order placed successfully!\n\n" +
        "Order Number: #" + orderNumber +
        "\nTotal: ₹" + total +
        "\nStatus: Preparing"
    );

    cart = [];

    showCart();
}


function bookSports(facilityName, button) {

    const card =
        button.parentElement;

    const date =
        card.querySelector(".sports-date").value;

    const time =
        card.querySelector(".sports-time").value;

    if (date === "" || time === "") {

        alert(
            "Please select a date and time first."
        );

        return;
    }

    const booking = {

        type: "booking",

        name:
            facilityName,

        details:
            "Sports facility booking",

        date:
            date,

        time:
            time
    };

    saveActivity(booking);

    alert(
        facilityName +
        " has been booked successfully.\n\n" +
        "Date: " + date +
        "\nTime: " + time
    );
}


function registerEvent(eventName) {

    const answer =
        confirm(
            "Do you want to register for " +
            eventName +
            "?"
        );

    if (answer) {

        const registration = {

            type: "event",

            name:
                eventName,

            details:
                "Event registration",

            date:
                "Upcoming"
        };

        saveActivity(registration);

        alert(
            "Registration successful!\n\n" +
            "Event: " + eventName
        );
    }
}


function saveActivity(activity) {

    let activities =
        JSON.parse(
            localStorage.getItem(
                "campusActivities"
            )
        ) || [];

    activities.push(activity);

    localStorage.setItem(
        "campusActivities",
        JSON.stringify(activities)
    );
}


function showActivity(filter) {

    const activityList =
        document.getElementById(
            "activityList"
        );

    if (!activityList) {
        return;
    }

    const activities =
        JSON.parse(
            localStorage.getItem(
                "campusActivities"
            )
        ) || [];

    let filteredActivities =
        activities;

    if (filter !== "all") {

        filteredActivities =
            activities.filter(
                item =>
                    item.type === filter
            );
    }

    if (filteredActivities.length === 0) {

        activityList.innerHTML = `
            <div class="empty-activity">

                <h3>
                    No activity found
                </h3>

                <p>
                    Your bookings, orders and
                    registrations will appear here.
                </p>

            </div>
        `;

        return;
    }

    activityList.innerHTML = "";

    const reversedActivities =
        [...filteredActivities].reverse();

    reversedActivities.forEach(item => {

        let extraDetails = "";

        if (item.type === "order") {

            extraDetails =
                "Total: ₹" +
                item.total +
                " | Status: " +
                item.status;

        } else if (item.time) {

            extraDetails =
                "Date: " +
                item.date +
                " | Time: " +
                item.time;

        } else {

            extraDetails =
                "Date: " +
                item.date;
        }

        activityList.innerHTML += `

            <div class="activity-card">

                <div>

                    <h3>
                        ${item.name}
                    </h3>

                    <p>
                        ${item.details}
                    </p>

                    <p>
                        ${extraDetails}
                    </p>

                </div>

                <span class="activity-type">
                    ${item.type}
                </span>

            </div>

        `;
    });
}


if (document.getElementById("activityList")) {

    showActivity("all");
}